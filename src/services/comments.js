import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

function normalizeComment(comment) {
  return {
    id: comment.id,
    parentId: comment.parent_id,
    targetType: comment.target_type,
    targetId: comment.target_id,
    username: comment.reddit_username,
    body: comment.body,
    likes: comment.likes ?? 0,
    dislikes: comment.dislikes ?? 0,
    timestamp: new Date(comment.created_at).getTime(),
    createdAt: comment.created_at,
    isTrusted: Boolean(comment.isTrusted),
  };
}

function normalizeUsername(username) {
  return String(username ?? "").trim().toLowerCase();
}

export async function fetchComments(targetType, targetId) {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from("profile_comments")
    .select("id, parent_id, target_type, target_id, reddit_username, body, likes, dislikes, created_at")
    .eq("target_type", targetType)
    .eq("target_id", String(targetId))
    .order("created_at", { ascending: true });

  if (error) throw error;

  let trustedUsernames = new Set();

  if ((data ?? []).length > 0) {
    const { data: trustedData, error: trustedError } = await supabase
      .from("trusted_users")
      .select("reddit_username");

    if (trustedError) throw trustedError;

    trustedUsernames = new Set((trustedData ?? []).map((user) => normalizeUsername(user.reddit_username)));
  }

  const comments = (data ?? []).map((comment) => normalizeComment({
    ...comment,
    isTrusted: trustedUsernames.has(normalizeUsername(comment.reddit_username)),
  }));
  const repliesByParent = comments.reduce((groups, comment) => {
    if (!comment.parentId) return groups;
    groups[comment.parentId] = [...(groups[comment.parentId] ?? []), comment];
    return groups;
  }, {});

  return comments
    .filter((comment) => !comment.parentId)
    .map((comment) => ({
      ...comment,
      replies: repliesByParent[comment.id] ?? [],
    }));
}

export async function postComment({ targetType, targetId, body, parentId, redditUsername }) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase must be configured before verified comments can be posted.");
  }

  const { error } = await supabase.from("profile_comments").insert({
    target_type: targetType,
    target_id: String(targetId),
    parent_id: parentId ?? null,
    body,
    reddit_username: redditUsername,
  });

  if (error) throw error;
}

export async function voteOnComment(commentId, voteType) {
  if (!isSupabaseConfigured) return;

  const { error } = await supabase.rpc("vote_on_profile_comment", {
    comment_id: commentId,
    vote_type: voteType,
  });

  if (error) throw error;
}
