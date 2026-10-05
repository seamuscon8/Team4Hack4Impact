import Navbar from "@/components/Navbar";
import styles from "./homepage.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className={styles.content}>
        <h1>COOL CUTS</h1>

        <p className={styles.description}>Welcome to the tuffest cuts on earth!</p>

        <div className={styles.images}>
          <Image src="/haircut1.jpg" alt="Before and After" width={500} height={350} className={styles.image} />

          <Image src="/haircut2.jpg" alt="Before and After" width={500} height={350} className={styles.image} />

          <Image src="/haircut3.jpg" alt="Before and After" width={500} height={350} className={styles.image} />
        </div>

        <a href="/book_now/" className={styles["button-link"]}>
          BOOK NOW
        </a>
      </div>
    </main>
  );
}
