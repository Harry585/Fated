"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAnuEmail } from "@/lib/matching";
import type { Gender, RelationshipIntent } from "@/lib/types";
import { loadWorkflowState, saveWorkflowState } from "@/lib/workflow";
import { createClient } from "@/utils/supabase/client";

type StoredProfile = {
  email: string;
  display_name: string;
  age: number;
  gender: Gender;
  interested_in: Gender[];
  bio: string;
  relationship_intent: RelationshipIntent;
  active: boolean;
};

export default function AuthConfirmedPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    async function confirmAuth() {
      const supabase = createClient();
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      const email = user?.email?.trim() ?? "";

      if (userError || !user || !email || !isAnuEmail(email)) {
        setError("We could not verify an ANU email session. Please try the sign-up link again.");
        return;
      }

      const currentState = loadWorkflowState();
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("email, display_name, age, gender, interested_in, bio, relationship_intent, active")
        .eq("id", user.id)
        .maybeSingle<StoredProfile>();

      if (profileError) {
        setError(profileError.message);
        return;
      }

      const nextState = {
        ...currentState,
        email: profile?.email ?? email,
        displayName: profile?.display_name ?? currentState.displayName,
        age: profile?.age ?? currentState.age,
        gender: profile?.gender ?? currentState.gender,
        interestedIn: profile?.interested_in ?? currentState.interestedIn,
        bio: profile?.bio ?? currentState.bio,
        relationshipIntent: profile?.relationship_intent ?? currentState.relationshipIntent,
        verifiedUniversityEmail: true,
        active: profile?.active ?? false,
        matchAccepted: false
      };

      saveWorkflowState(nextState);
      router.replace(nextState.displayName ? "/questions" : "/register");
    }

    void confirmAuth();
  }, [router]);

  return (
    <main className="page-shell">
      <nav className="top-nav">
        <Link className="brand" href="/">
          Fated
        </Link>
      </nav>

      <section className="section-heading narrow">
        <span className="eyebrow">Email verification</span>
        <h1>{error ? "Verification failed" : "Verifying your ANU email..."}</h1>
        {error ? <p className="error centered">{error}</p> : <p className="lede">One moment while we finish sign-up.</p>}
        {error ? (
          <Link className="button" href="/register">
            Back to sign-up
          </Link>
        ) : null}
      </section>
    </main>
  );
}
