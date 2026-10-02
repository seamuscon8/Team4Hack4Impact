import Navbar from "@/components/Navbar";
import styles from "./homepage.module.css";

export default function Home() {
  return (
    <main>
      <Navbar />
      <a href="/book_now/" className={styles["button-link"]}>
        BOOK NOW
      </a>
    </main>
  );
}
