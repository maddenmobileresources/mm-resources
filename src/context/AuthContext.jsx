import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

function pickUsernameFromUser(user) {
  const metadata = user?.user_metadata ?? {};
  const identityData = user?.identities?.[0]?.identity_data ?? {};

  return (
    metadata.preferred_username ||
    metadata.user_name ||
    metadata.username ||
    metadata.name ||
    metadata.full_name ||
    identityData.preferred_username ||
    identityData.user_name ||
    identityData.username ||
    identityData.name ||
    user?.email?.split("@")[0] ||
    "Community User"
  );
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return undefined;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => {
    const user = session?.user ?? null;
    const displayUsername = pickUsernameFromUser(user);
    const redditUsername = displayUsername;
    const authProvider = user?.app_metadata?.provider || user?.identities?.[0]?.provider || "";

    return {
      isAuthReady: !loading,
      isAuthConfigured: isSupabaseConfigured,
      isSignedIn: Boolean(user),
      session,
      user,
      authProvider,
      displayUsername,
      redditUsername,
      async signInWithReddit() {
        if (!isSupabaseConfigured) return;

        await supabase.auth.signInWithOAuth({
          provider: "custom:reddit",
          options: {
            redirectTo: window.location.href,
            scopes: "identity",
          },
        });
      },
      async signInWithDiscord() {
        if (!isSupabaseConfigured) return;

        await supabase.auth.signInWithOAuth({
          provider: "discord",
          options: {
            redirectTo: window.location.href,
          },
        });
      },
      async signOut() {
        if (!isSupabaseConfigured) return;
        await supabase.auth.signOut();
      },
    };
  }, [loading, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return value;
}
