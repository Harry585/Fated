"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAnuEmail } from "@/lib/matching";
import { loadWorkflowState, saveWorkflowState } from "@/lib/workflow";
import { createClient } from "@/utils/supabase/client";

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

      if (userError || !email || !isAnuEmail(email)) {
        setError("We could not verify an ANU email session. Please try the sign-up link again.");
        return;
      }

      const currentState = loadWorkflowState();
      const nextState = {
        ...currentState,
        email,
        verifiedUniversityEmail: true,
        active: false,
        matchAccepted: false
      };

      saveWorkflowState(nextState);
      router.replace("/questions");
    }

    void confirmAuth();
  }, [router]);

  return (
    <main className="page-shell">
      <nav className="top-nav">
        <Link className="brand" href="/">
          ANU Match
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
