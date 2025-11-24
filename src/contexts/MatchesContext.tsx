"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type MatchesContextValue = {
  matches: string[];
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
  const [matches, setMatches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("matches");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setMatches(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse matches from localStorage", e);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("matches", JSON.stringify(matches));
  }, [matches]);

  const addMatch = (id: string) => {
    setMatches((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const resetMatches = () => {
    setMatches([]);
  };

  return (
    <MatchesContext.Provider
      value={{
        matches,
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
