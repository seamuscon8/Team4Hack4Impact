import Navbar from "@/components/Navbar";
import styles from "./about-page.module.css";
import Image from "next/image";
import { BarberCard, createBarber } from "@/components/Barber";

const barbers = [createBarber("Alex", 40, 4.8), createBarber("Jordan", 32, 4.5), createBarber("Sam", 28, 4.2)];

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
          <Image src="/images/haircut-stock.jpg" alt="Piece of crap image!" width={400} height={200} />
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
        {barbers.map((b) => (
          <BarberCard key={b.name} barber={b} />
        ))}
      </div>
    </main>
  );
}
