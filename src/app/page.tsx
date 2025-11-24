import styles from "./page.module.scss";
import Link from "next/link";
import { getCats } from "@/lib/cats";
import Header from "@/components/header/Header";
import Duel from "@/components/duel/Duel";
import Matches from "@/components/status/matches/Matches";

// if mock
// import data from "@/data/cats.json";
// export const dynamic = "force-static";

export const revalidate = 60;

export default async function Home() {
  //if mock
  // const { images } = data;

  const { images } = await getCats();

  // const firstCats = images.slice(0, 2);

  return (
    <main className={styles.votes}>
      <Header />
      <Duel cats={images} />
      <div className={styles.status}>
        <Link href="/ranking" className={styles.cta}>
          Voir le classement des chats
        </Link>
        <Matches />
      </div>
    </main>
  );
}
