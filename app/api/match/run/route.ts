import { NextResponse } from "next/server";
import { demoUsers } from "@/lib/demo-data";
import { createGreedyMatches } from "@/lib/matching";

export async function POST() {
  const matches = createGreedyMatches(demoUsers).map((match) => ({
    userAId: match.userA.id,
    userBId: match.userB.id,
    score: match.score,
    reasons: match.reasons
  }));

  return NextResponse.json({
    roundId: `demo-${Date.now()}`,
    cadence: "weekly",
    matches
  });
}
