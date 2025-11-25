"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  useMemo,
} from "react";

type VoteCounts = Record<string, number>;

type MatchesContextValue = {
  matches: string[];
  voteCounts: VoteCounts;
  getVotes: (id: string) => number;
  addMatch: (id: string) => void;
  resetMatches: () => void;
};

const MatchesContext = createContext<MatchesContextValue | undefined>(
  undefined
);

type MatchesProviderProps = {
  children: ReactNode;
};

export function MatchesProvider({ children }: MatchesProviderProps) {
  const [matches, setMatches] = useState<string[]>(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = window.localStorage.getItem("matches");
        const parsed = saved ? JSON.parse(saved) : [];
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (e) {
      console.error("Failed to parse matches from localStorage", e);
    }

    return [];
  });

  useEffect(() => {
    window.localStorage.setItem("matches", JSON.stringify(matches));
  }, [matches]);

  const voteCounts = useMemo(() => {
    return matches.reduce<Record<string, number>>((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});
  }, [matches]);

  const getVotes = (id: string) => voteCounts[id] || 0;

  const addMatch = (id: string) => {
    setMatches((prev) => [...prev, id]);
  };

  const resetMatches = () => {
    setMatches([]);
  };

  return (
    <MatchesContext.Provider
      value={{
        matches,
        voteCounts,
        getVotes,
        addMatch,
        resetMatches,
      }}
    >
      {children}
    </MatchesContext.Provider>
  );
}

export function useMatches() {
  const ctx = useContext(MatchesContext);
  if (!ctx) {
    throw new Error("useMatches must be used within a MatchesProvider");
  }
  return ctx;
}
