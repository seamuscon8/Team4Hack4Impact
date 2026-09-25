import Navbar from "@/components/Navbar";
import styles from "./about-page.module.css";
import Image from "next/image";
import { BarberCard, createBarber } from "@/components/Barber";

// Creating mock barber profiles
const barbers = [
  createBarber("Alex", 40, 4.8, "whaddup"),
  createBarber("Jordan", 32, 4.5, "yo"),
  createBarber("Sam", 28, 4.2, "hey"),
];

export default function About() {
  return (
    <main>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>About</h1>
      <div className={styles.aboutContent}>
        <section>
          <h2>Our Mission</h2>
          <p>
            {" "}
            bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh bluh
            bluh bluh bluh bluh bluh bluh
          </p>
        </section>
        <Image src="/images/haircut-stock.jpg" alt="Piece of crap image!" width={400} height={200} />
      </div>
      <hr style={{ margin: "auto", marginTop: "50px", width: "50%" }} />
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
