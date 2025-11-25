import styles from "./ranking.module.scss";
import { getCats } from "@/lib/cats";
import Header from "@/components/header/Header";
import Matches from "@/components/status/matches/Matches";
import { Podium } from "@/components/podium/Podium";

// if mock
// import data from "@/data/cats.json";
// export const dynamic = "force-static";

export const revalidate = 60;

export default async function Ranking() {
  //if mock
  // const { images } = data;

  const { images } = await getCats();

  return (
    <main className={styles.ranking}>
      <Header />
      <Podium cats={images} />
      <Matches ctaUrl="/" ctaLabel="Retour aux votes" />
    </main>
  );
}
