"use client";

import { useMatches } from "@/contexts/MatchesContext";
import Link from "next/link";
import styles from "./matches.module.scss";
import classNames from "classnames";

export type MatchesProps = {
  minified?: boolean;
  ctaUrl: string;
  ctaLabel: string;
};

export default function Matches({ minified, ctaUrl, ctaLabel }: MatchesProps) {
  const { matches } = useMatches();

  return (
    <aside
      className={classNames(styles.status, {
        [styles.minified]: minified,
      })}
    >
      <Link href={ctaUrl} className={styles.cta}>
        {ctaLabel}
      </Link>

      <p className={styles.counter}>
        <strong>{matches.length}</strong> matchs joués
      </p>
    </aside>
  );
}
