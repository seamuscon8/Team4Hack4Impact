"use client";

import Navbar from "@/components/Navbar";
import styles from "./contact.module.css";

export default function ContactPage() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Message submitted!");
  }

  return (
    <main>
      <Navbar />

      <div className={styles.contactPage}>
        <section className={styles.header}>
          <p className={styles.eyebrow}>GET IN TOUCH</p>
          <h1>Contact Us</h1>
          <p className={styles.subtitle}>Have a question or want to learn more? Send us a message.</p>
        </section>

        <section className={styles.contactSection}>
          <div className={styles.info}>
            <h2>Visit Us</h2>

            <div className={styles.infoBlock}>
              <h3>Location</h3>
              <p>420 Random Location</p>
              <p>City, State, 99999</p>
            </div>

            <div className={styles.infoBlock}>
              <h3>Hours</h3>
              <p>Mon-Fri: 9 AM – 7 PM</p>
              <p>Saturday: 8 AM – 6 PM</p>
              <p>Sunday: Closed</p>
            </div>

            <div className={styles.infoBlock}>
              <h3>Contact</h3>
              <p>(805) 555-1234</p>
              <p>contact@barbershop.com</p>
            </div>
          </div>

          <div className={styles.formContainer}>
            <h2>Send Us a Message</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={6} required />
              </div>

              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
