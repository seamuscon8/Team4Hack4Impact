import Navbar from "@/components/Navbar";
import styles from "./about-page.module.css";
import Image from "next/image";
import { BarberCard, createBarber } from "@/components/Barber";

// Creating mock barber profiles
const barbers = [
  createBarber("Seamus", 5.0, "bluh bluh bluh bluh bluh", "/images/haircut-stock.jpg"),

  createBarber("Abhay", 5.0, "bluh bluh bluh bluh", "/images/haircut-stock.jpg"),

  createBarber("Arnav", 5.0, "bluh bluh bluh", "/images/haircut-stock.jpg"),

  createBarber("Christian", 5.0, "bluh bluh bluh bluh ", "/images/haircut-stock.jpg"),

  createBarber("Miles", 5.0, "bluh bluh bluh bluh bluh", "/images/haircut-stock.jpg"),
  createBarber("Angele", 5.0, "bluh bluh bluh", "/images/haircut-stock.jpg"),
];

export default function About() {
  return (
    <main>
      <Navbar />

      <div className={styles.hero}>
        <h1>ABOUT US</h1>
      </div>

      {/* Barbershop Description */}
      <div className={styles.aboutContent}>
        <section className={styles.aboutText}>
          <h2>We. Love. Cutting. Hair.</h2>
          <p>
            Insert stuff about our awesome barbershop! The freshest cuts, the sweetest styles. Bluh bluh bluh bluh bluh
            bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh.
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

      <hr className={styles.hrSpacing} />

      {/* Location & Hours */}
      <div className={styles.scheduleInfo}>
        <section>
          <h2>Location</h2>
          <p>
            420 Random Location <br />
            City, State, 99999
          </p>
        </section>
        <section>
          <h2>Hours</h2>
          <p>
            Mon-Fri: 9 AM – 7 PM <br />
            Saturday: 8 AM – 6 PM <br />* Sunday: Closed
          </p>
        </section>
      </div>

      <hr className={styles.hrSpacing} />

      {/* List of Barbers */}
      <h1 className={styles.barbersHeader}>Meet our Barbers</h1>
      <div className={styles.aboutBarbers}>
        {barbers.map((b) => (
          <BarberCard key={b.name} barber={b} />
        ))}
      </div>
    </main>
  );
}
