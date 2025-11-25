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

  return (
    <main className={styles.home}>
      <Header />
      <Duel cats={images} />
      <Matches
        minified={true}
        ctaUrl="/ranking"
        ctaLabel="Voir le classement des chats"
      />
    </main>
  );
}
