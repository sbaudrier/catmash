"use client";

import { useMatches } from "@/contexts/MatchesContext";

export default function Matches() {
  const { matches } = useMatches();

  console.log("matches:", matches);

  return (
    <p>
      <strong>{matches.length}</strong> matchs joués
    </p>
  );
}
