"use client";

import Image from "next/image";
import { useMatches } from "@/contexts/MatchesContext";
import { getTopCats } from "@/lib/topcats";
import styles from "./podium.module.scss";
import classNames from "classnames";

type Cat = {
  id: string;
  url: string;
};

type PodiumProps = {
  cats: Cat[];
};

export function Podium({ cats }: PodiumProps) {
  const { matches, getVotes } = useMatches();
  const top3 = getTopCats(cats, matches).slice(0, 3);
  const topRemainingCats = getTopCats(cats, matches).filter(
    (cat) => !top3.some((top) => top.id === cat.id)
  );

  return (
    <>
      {getTopCats(cats, matches).length > 1 ? (
        <div className={styles.podium}>
          <h2 className={styles.title}>Vos 3 chats préférés</h2>
          <ul className={styles["podium-items"]}>
            {top3.map((cat, index) => (
              <li
                key={cat.id}
                className={classNames(styles["item"], {
                  [styles.gold]: index === 0,
                  [styles.silver]: index === 1,
                  [styles.bronze]: index === 2,
                })}
              >
                <p className={styles["position"]}>{index + 1}</p>
                <span className={styles["id"]}>{cat.id}</span>
                <span className={styles["votes"]}>
                  <span className={styles["votes-label"]}>
                    {getVotes(cat.id)}
                  </span>
                </span>
                <Image
                  src={cat.url}
                  alt={cat.id}
                  width={200}
                  height={200}
                  className={styles["pic"]}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={styles.blank}>
          Il manque des votes pour afficher le classement !
        </p>
      )}

      {topRemainingCats.length > 0 && (
        <div className={styles["other-votes"]}>
          <h2 className={styles.title}>Vous avez également voté</h2>
          <div className={styles.remaining}>
            {topRemainingCats.map((cat, index) => (
              <li key={cat.id} className={classNames(styles["item"])}>
                <p className={styles["position"]}>{index + 4}</p>
                <span className={styles["id"]}>{cat.id}</span>
                <span className={styles["votes"]}>
                  <span className={styles["votes-label"]}>
                    {getVotes(cat.id)}
                  </span>
                </span>
                <Image
                  src={cat.url}
                  alt={cat.id}
                  width={200}
                  height={200}
                  className={styles["pic"]}
                />
              </li>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
