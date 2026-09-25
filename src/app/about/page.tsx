import Navbar from "@/components/Navbar";
import styles from "./about-page.module.css";
import Image from "next/image";

export default function About() {
  return (
    <main>
      <Navbar />
      <div className={styles.aboutContent}>
        <h1>About</h1>
        <section>
          <h2>Our Mission</h2>
          <p>
            {" "}
            bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh
            bluh bluh bluh bluh bluh bluh
          </p>
          <Image src="/cover-photo.webp" alt="" width={400} height={200} />
        </section>
      </div>
      <div className={styles.contactInfo}>
        <section>
          <h2>Location</h2>
          <p>
            {" "}
            bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh
            bluh bluh bluh bluh bluh bluh
          </p>
        </section>
        <section>
          <h2>Hours</h2>
          <p>
            {" "}
            bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh
            bluh bluh bluh bluh bluh bluh
          </p>
        </section>
      </div>
      <div className={styles.aboutBarbers}>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
      </div>
    </main>
  );
}
