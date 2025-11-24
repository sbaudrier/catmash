"use client";

import Image from "next/image";
import styles from "./duel.module.scss";
import classNames from "classnames";
import { useMatches } from "@/contexts/MatchesContext";

type Cat = {
  id: string;
  url: string;
};

type DuelProps = {
  cats: Cat[];
};

export default function Duel({ cats }: DuelProps) {
  const { matches, addMatch } = useMatches();

  const availableCats = cats
    .filter((cat) => !matches.includes(cat.id))
    .slice(0, 2);

  const handleClick = (id: string) => {
    addMatch(id);
  };

  return (
    <div className={styles.duel}>
      {availableCats.map((cat) => {
        const alreadyVoted = matches.includes(cat.id);

        return (
          <article
            key={cat.id}
            className={classNames(styles["duel-item"], {
              [styles.test]: alreadyVoted,
            })}
          >
            <button
              onClick={() => handleClick(cat.id)}
              className={styles["duel-button"]}
              disabled={alreadyVoted}
            >
              <Image
                src={cat.url}
                className={styles["duel-button-pic"]}
                alt={`Cat ${cat.id}`}
                width={300}
                height={300}
              />
            </button>
          </article>
        );
      })}
    </div>
  );
}
