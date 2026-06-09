import { useEffect, useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { useTheme } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";
import { fetchComments, postComment, voteOnComment } from "./services/comments";
import { IdentityTags } from "./components/IdentityTags";

const SORT_OPTIONS = ["Best", "Newest", "Oldest"];

const BANNED_WORDS = [
  "fuck", "shit", "ass", "bitch", "bastard", "cum", "kike", "jackass", "prick", "blowjob", "dildo", "penis", "fentanyl",
  "cock", "dick", "pussy", "cunt", "whore", "slut", "nigger", "nigga", "twat", "handjob", "titty", "vagina", "heroin",
  "faggot", "fag", "retard", "retarded", "asshole", "bullshit", "motherfucker", "clusterfuck", "sex", "meth", "cocaine",
  "fucker", "dumbass", "dipshit", "horseshit", "tranny", "dyke", "wanker", "cracker", "queer"
];

function censorText(text) {
  let censored = text;
  BANNED_WORDS.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\w*`, "gi");
    censored = censored.replace(regex, (match) => "*".repeat(match.length));
  });
  return censored;
}

function timeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function splitTarget(targetId) {
  const value = String(targetId);
  if (value.startsWith("play-")) {
    return { targetType: "play", targetId: value.replace("play-", "") };
  }
  return { targetType: "player", targetId: value };
}

function LoginInfoNote({ isDark }) {
  return (
    <span className="group relative inline-flex">
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${
          isDark ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600"
        }`}
        aria-label="Why login is required"
        tabIndex={0}
      >
        <Info size={14} />
      </span>
      <span
        className={`pointer-events-none absolute right-0 top-8 z-50 hidden w-72 rounded border p-3 text-left text-xs leading-relaxed shadow-lg group-hover:block group-focus-within:block ${
          isDark
            ? "border-slate-700 bg-zinc-900 text-gray-200"
            : "border-gray-200 bg-white text-gray-700"
        }`}
      >
        Login is required to reduce spam and keep comments tied to a real community account. Your password is entered only on the provider's login page, never on this website. We only receive basic profile info, such as your display name and account ID, to show who posted a comment.
      </span>
    </span>
  );
}

export default function PlayerComments({ playerId }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { isAuthConfigured, isSignedIn, discordUsername, signInWithDiscord } = useAuth();
  const { targetType, targetId } = splitTarget(playerId);

  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [sort, setSort] = useState("Best");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyBody, setReplyBody] = useState("");
  const [expandedReplies, setExpandedReplies] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadComments() {
    setLoading(true);
    setError("");

    try {
      setComments(await fetchComments(targetType, targetId));
    } catch (nextError) {
      setError(nextError.message || "Unable to load comments.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComments();
  }, [targetType, targetId]);

  function getSorted(list) {
    const copy = [...list];
    if (sort === "Newest") return copy.sort((a, b) => b.timestamp - a.timestamp);
    if (sort === "Oldest") return copy.sort((a, b) => a.timestamp - b.timestamp);
    if (sort === "Best") return copy.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
    return copy;
  }

  async function handlePost() {
    if (!body.trim() || !isSignedIn) return;
    setSaving(true);
    setError("");

    try {
      await postComment({
        targetType,
        targetId,
        body: censorText(body.trim()),
      });
      setBody("");
      await loadComments();
    } catch (nextError) {
      setError(nextError.message || "Unable to post comment.");
    } finally {
      setSaving(false);
    }
  }

  async function handleReplyPost(commentId) {
    if (!replyBody.trim() || !isSignedIn) return;
    setSaving(true);
    setError("");

    try {
      await postComment({
        targetType,
        targetId,
        parentId: commentId,
        body: censorText(replyBody.trim()),
      });
      setReplyingTo(null);
      setReplyBody("");
      setExpandedReplies((prev) => ({ ...prev, [commentId]: true }));
      await loadComments();
    } catch (nextError) {
      setError(nextError.message || "Unable to post reply.");
    } finally {
      setSaving(false);
    }
  }

  async function handleVote(commentId, voteType) {
    try {
      await voteOnComment(commentId, voteType);
      await loadComments();
    } catch (nextError) {
      setError(nextError.message || "Unable to save vote.");
    }
  }

  const inputClass = isDark
    ? "w-full px-3 py-2 rounded bg-zinc-700 border border-gray-600 text-gray-100 outline-none text-sm"
    : "w-full px-3 py-2 rounded bg-white border border-gray-300 text-gray-900 outline-none text-sm";

  const cardClass = isDark
    ? "bg-zinc-800 border border-gray-700 rounded-lg p-4"
    : "bg-white border border-gray-200 rounded-lg p-4 shadow-sm";

  const sorted = getSorted(comments);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">
          {comments.length} Comment{comments.length !== 1 ? "s" : ""}
        </h3>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className={isDark
              ? "flex items-center gap-2 px-3 py-1.5 rounded border border-gray-600 bg-zinc-800 text-gray-100 text-sm"
              : "flex items-center gap-2 px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-800 text-sm"}
          >
            {sort} <ChevronDown size={14} strokeWidth={2.25} />
          </button>
          {showSortMenu && (
            <div
              style={{ position: "absolute", right: 0, top: "100%", marginTop: 4, zIndex: 50, minWidth: 120 }}
              className={isDark
                ? "bg-zinc-800 border border-gray-600 rounded shadow-lg"
                : "bg-white border border-gray-200 rounded shadow-lg"}
            >
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setSort(opt); setShowSortMenu(false); }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    sort === opt
                      ? "bg-blue-500 text-white"
                      : isDark
                        ? "text-gray-200 hover:bg-zinc-700"
                        : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className={`mb-3 rounded border px-3 py-2 text-sm ${isDark ? "border-red-700 bg-red-950 text-red-100" : "border-red-200 bg-red-50 text-red-800"}`}>
          {error}
        </p>
      )}

      <div className={`${cardClass} mb-6`}>
        <p className={`text-sm font-semibold mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          Leave a Comment
        </p>

        {!isAuthConfigured ? (
          <p className={`text-sm ${isDark ? "text-amber-200" : "text-amber-700"}`}>
            Configure Supabase and Discord login before verified comments can be posted.
          </p>
        ) : !isSignedIn ? (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className={`min-w-0 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Sign in with Discord to comment. Reddit tags are added after manual verification.
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex w-full flex-col gap-2 sm:w-56">
                <button
                  onClick={signInWithDiscord}
                  className="w-full rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Sign in with Discord
                </button>
              </div>
              <LoginInfoNote isDark={isDark} />
            </div>
          </div>
        ) : (
          <>
            <p className={`mb-2 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Posting as <strong>{discordUsername}</strong>
            </p>
            <textarea
              className={`${inputClass} mb-3`}
              placeholder="Share your thoughts..."
              rows={3}
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
            <button
              onClick={handlePost}
              disabled={!body.trim() || saving}
              className="px-5 py-2 bg-blue-500 text-white rounded font-semibold text-sm hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? "Posting..." : "Post Comment"}
            </button>
          </>
        )}
      </div>

      {loading ? (
        <p className={isDark ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Loading comments...</p>
      ) : sorted.length === 0 ? (
        <p className={isDark ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-4">
          {sorted.map((comment) => (
            <div key={comment.id} className={cardClass}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white text-xs font-bold">
                  {comment.username[0].toUpperCase()}
                </div>
                <IdentityTags profile={comment.profile} fallbackDiscordName={comment.username} />
                <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {timeAgo(comment.timestamp)}
                </span>
              </div>

              <p className={`text-sm mb-3 ml-10 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                {comment.body}
              </p>

              <div className="flex items-center gap-4 ml-10">
                <button
                  onClick={() => handleVote(comment.id, "like")}
                  className={`flex items-center gap-1 text-xs ${isDark ? "text-gray-400 hover:text-green-400" : "text-gray-500 hover:text-green-600"}`}
                >
                  ^ {comment.likes}
                </button>
                <button
                  onClick={() => handleVote(comment.id, "dislike")}
                  className={`flex items-center gap-1 text-xs ${isDark ? "text-gray-400 hover:text-red-400" : "text-gray-500 hover:text-red-500"}`}
                >
                  v {comment.dislikes}
                </button>
                {isSignedIn && (
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="text-xs text-blue-500 hover:text-blue-600 font-semibold"
                  >
                    Reply
                  </button>
                )}
                {comment.replies.length > 0 && (
                  <button
                    onClick={() => setExpandedReplies((prev) => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                    className="text-xs text-blue-500 hover:text-blue-600"
                  >
                    {expandedReplies[comment.id]
                      ? "Hide Replies"
                      : `View ${comment.replies.length} Repl${comment.replies.length !== 1 ? "ies" : "y"}`}
                  </button>
                )}
              </div>

              {replyingTo === comment.id && (
                <div className="ml-10 mt-3 space-y-2">
                  <p className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    Replying as <strong>{discordUsername}</strong>
                  </p>
                  <textarea
                    className={inputClass}
                    placeholder="Write a reply..."
                    rows={2}
                    value={replyBody}
                    onChange={(event) => setReplyBody(event.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReplyPost(comment.id)}
                      disabled={!replyBody.trim() || saving}
                      className="px-4 py-1.5 bg-blue-500 text-white rounded text-xs font-semibold hover:bg-blue-600 disabled:opacity-40"
                    >
                      Post Reply
                    </button>
                    <button
                      onClick={() => { setReplyingTo(null); setReplyBody(""); }}
                      className={`px-4 py-1.5 rounded text-xs font-semibold ${isDark ? "bg-zinc-700 text-gray-300 hover:bg-zinc-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {expandedReplies[comment.id] && comment.replies.length > 0 && (
                <div className="ml-10 mt-3 space-y-3 border-l-2 border-blue-400 pl-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center text-white text-xs font-bold">
                          {reply.username[0].toUpperCase()}
                        </div>
                        <IdentityTags profile={reply.profile} fallbackDiscordName={reply.username} compact />
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          {timeAgo(reply.timestamp)}
                        </span>
                      </div>
                      <p className={`text-xs ml-8 mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {reply.body}
                      </p>
                      <button
                        onClick={() => handleVote(reply.id, "like")}
                        className={`text-xs ml-8 ${isDark ? "text-gray-400 hover:text-green-400" : "text-gray-500 hover:text-green-600"}`}
                      >
                        ^ {reply.likes}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
