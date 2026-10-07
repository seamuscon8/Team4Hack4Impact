import Link from "next/link";
import styles from "styles/NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Haircut Place
      </Link>

      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/before-after">Before & After</Link>
        <Link href="/book-now">Book Now</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
