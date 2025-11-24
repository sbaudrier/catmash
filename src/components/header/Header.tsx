import Image from "next/image";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Image
          className={styles.logo}
          src="/catmash.svg"
          alt="CATMASH - Vote pour le plus beau des chats"
          width={160}
          height={40}
          priority
        />
        <span className={styles["ssr-only"]}>Catmash</span>
      </h1>
    </header>
  );
}
