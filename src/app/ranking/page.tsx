import Image from "next/image";
import styles from "./ranking.module.scss";
import Link from "next/link";
import { getCats } from "@/lib/cats";
import Header from "@/components/header/Header";

// if mock
// import data from "@/data/cats.json";
// export const dynamic = "force-static";

export const revalidate = 60;

export default async function Ranking() {
  //if mock
  // const { images } = data;

  const { images } = await getCats();

  const firstCats = images.slice(0, 10);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <div className={styles.votes}>
          {firstCats.map((cat) => (
            <article key={cat.id} className="cat">
              <Image
                src={cat.url}
                alt={`Cat ${cat.id}`}
                width={300}
                height={300}
                style={{ objectFit: "cover" }}
              />
            </article>
          ))}
        </div>
        <div className="resume">
          <p>
            <Link href="/ranking">Voir le classement des chats</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
