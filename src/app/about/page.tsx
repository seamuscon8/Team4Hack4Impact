import Navbar from "@/components/Navbar";
import styles from "./about-page.module.css";
import Image from "next/image";
import { BarberCard, createBarber } from "@/components/Barber";

// Creating mock barber profiles
const barbers = [
  createBarber("Alex", 40, 4.8, "whaddup", "/images/haircut-stock.jpg"),
  createBarber("Jordan", 32, 4.5, "yo", "/images/haircut-stock.jpg"),
  createBarber("Sam", 28, 4.2, "hey", "/images/haircut-stock.jpg"),
];

export default function About() {
  return (
    <main>
      <Navbar />
      {/* Barbershop Description */}
      <h1 className={styles.centerText}>About Us</h1>
      <div className={styles.aboutContent}>
        <section>
          <h2>We. Love. Cutting. Hair.</h2>
          <p> Insert stuff about our awesome barbershop! The freshest cuts, the sweetest styles. </p>
        </section>
        <Image src="/images/haircut-stock.jpg" alt="Barber cutting hair" width={400} height={200} />
      </div>

      {/* Location & Hours */}
      <hr className={styles.hrSpacing} />
      <div className={styles.contactInfo}>
        <section>
          <h2>Location</h2>
          <p>
            bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh
            bluh bluh bluh bluh bluh bluh
          </p>
        </section>
        <section>
          <h2>Hours</h2>
          <p>
            bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh
            bluh bluh bluh bluh bluh bluh
          </p>
        </section>
      </div>

      {/* List of Barbers */}
      <hr className={styles.hrSpacing} />
      <h1 className={styles.centerText}>Meet our Barbers:</h1>
      <div className={styles.aboutBarbers}>
        {barbers.map((b) => (
          <BarberCard key={b.name} barber={b} />
        ))}
      </div>
    </main>
  );
}
