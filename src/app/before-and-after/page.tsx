import Navbar from "@/components/Navbar";
import styles from "./before-and-after-page.module.css";
import Image from "next/image";
import { createBeforeAfter, BeforeAfterGallery } from "@/components/gallery";

const beforeAfter = [
  createBeforeAfter("/images/ba-1-before.jpg", "/images/ba-1-after.jpg", "Awesome Haircut 1"),
  createBeforeAfter("/images/ba-2-before.jpg", "/images/ba-2-after.jpg", "Awesome Haircut 2"),
  createBeforeAfter("/images/ba-3-before.jpg", "/images/ba-3-after.jpg", "Awesome Haircut 3"),
  createBeforeAfter("/images/ba-4-before.jpg", "/images/ba-4-after.jpg", "Awesome Haircut 4"),
];

export default function BeforeAndAfter() {
  return (
    <main>
      <Navbar />
      <h6 className={styles.pageSubtitle}>Transformations</h6>
      <h1 className={styles.pageTitle}>Before & After</h1>

      {beforeAfter.map((item) => (
        <BeforeAfterGallery key={item.name} beforeAfter={item} />
      ))}
    </main>
  );
}
