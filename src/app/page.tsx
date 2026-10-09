"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { mockAppointments } from "@/data/haircutappointment";
import { mockBarber } from "@/data/barber";
import Link from "next/link";
import Image from "next/image";
import styles from "./homepage.module.css";

const haircutStyles = [
  {
    title: "Clean fade",
    description: "A fresh taper with a clean finish.",
    image: "/images/before-after/ba-1-after.jpg",
  },
  {
    title: "Natural texture",
    description: "Shape and definition without losing texture.",
    image: "/images/before-after/ba-2-after.jpg",
  },
  {
    title: "Classic cut",
    description: "A closer look at the finished cut.",
    image: "/images/before-after/ba-3-after.jpg",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <Navbar />

      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>Haircut Place / San Luis Obispo</p>
            <h1>
              Good hair.
              <br />
              No fuss.
            </h1>
            <p className={styles.description}>Clean fades, natural texture, and a cut that feels like you.</p>

            <div className={styles.heroLinks}>
              <Link className={styles.primaryLink} href="/book-now">
                Book now <span>↗</span>
              </Link>
              <Link className={styles.secondaryLink} href="/about">
                About Us <span>↗</span>
              </Link>
            </div>

            <p className={styles.note}>Haircuts made for your everyday.</p>
          </div>

          <figure className={styles.heroImage}>
            <Image
              alt="A fresh haircut at Haircut Place"
              className={styles.image}
              height={680}
              priority
              src="/images/barber1.jpg"
              width={570}
            />
            <figcaption>Haircut Place, at work — in the chair.</figcaption>
          </figure>
        </section>

        <section className={styles.workSection}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Selected work</p>
              <h2>Real cuts. A closer look.</h2>
            </div>
            <Link href="/before-after">Before &amp; after ↗</Link>
          </div>

          <div className={styles.workGrid}>
            {haircutStyles.map((haircut) => (
              <article className={styles.workCard} key={haircut.title}>
                <Image alt={haircut.title} className={styles.workImage} height={420} src={haircut.image} width={380} />
                <h3>{haircut.title}</h3>
                <p>{haircut.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
