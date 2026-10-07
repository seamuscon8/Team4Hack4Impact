"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { mockAppointments } from "@/data/haircutappointment";
import { mockBarber } from "@/data/barber";
import Image from "next/image";
import styles from "./homepage.module.css";
export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("Choose a haircut");

  function chooseStyle(style: string) {
    setSelectedStyle(style);
    setDropdownOpen(false);
  }

  return (
    <main>
      <Navbar />

      <div className={styles.content}>
        <h1>COOL CUTS</h1>

        <p className={styles.description}>Welcome to the tuffest cuts on earth!</p>

        <div className={styles.images}>
          <Image src="/images/haircut1.jpg" alt="Before and after" width={500} height={350} className={styles.image} />
          <Image
            src="/images/haircut3.jpeg"
            alt="Another before and after"
            width={500}
            height={350}
            className={styles.image}
          />
          <Image src="/images/haircut-stock.jpg" alt="Stock image" width={500} height={350} className={styles.image} />
        </div>

        <div className={styles.dropdown}>
          <button type="button" className={styles.dropbtn} onClick={() => setDropdownOpen(!dropdownOpen)}>
            {selectedStyle}
          </button>

          <div className={`${styles.dropdownContent} ${dropdownOpen ? styles.show : ""}`}>
            <button type="button" onClick={() => chooseStyle("Buzz Cut")}>
              Buzz Cut
            </button>
            <button type="button" onClick={() => chooseStyle("Dreads")}>
              Dreads
            </button>
            <button type="button" onClick={() => chooseStyle("GTA Cut")}>
              GTA Cut
            </button>
          </div>
        </div>

        <a href="/book_now" className={styles["button-link"]}>
          BOOK NOW
        </a>
      </div>
    </main>
  );
}
