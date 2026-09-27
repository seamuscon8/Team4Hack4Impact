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

      <div className={styles.hero}>
        <h1>About Us</h1>
      </div>

      {/* Barbershop Description */}
      <div className={styles.aboutContent}>
        <section>
          <h2 className={styles.heading}>We. Love. Cutting. Hair.</h2>
          <p className={styles.paragraph}>
            Insert stuff about our awesome barbershop! The freshest cuts, the sweetest styles.
          </p>
        </section>
        <Image
          src="/images/haircut-stock.jpg"
          alt="Barber cutting hair"
          width={400}
          height={200}
          className={styles.aboutImage}
        />
      </div>

      {/* Location & Hours */}
      <hr className={styles.hrSpacing} />
      <div className={styles.contactInfo}>
        <section>
          <h2 className={styles.heading}>Location</h2>
          <p>
            420 Random Location <br />
            City, State, 99999
          </p>
        </section>
        <section>
          <h2 className={styles.heading}>Hours</h2>
          <p>
            Mon-Fri: 9 AM – 7 PM <br />
            Saturday: 8 AM – 6 PM <br />* Sunday: Closed
          </p>
        </section>
      </div>

      {/* List of Barbers */}
      <hr className={styles.hrSpacing} />
      <div className={styles.aboutBarbers}>
        <h1 className={styles.h1Header}>Meet our Barbers:</h1>
        {barbers.map((b) => (
          <BarberCard key={b.name} barber={b} />
        ))}
      </div>
    </main>
  );
}
