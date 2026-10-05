import Navbar from "@/components/Navbar";
import styles from "./before-and-after-page.module.css";
import Image from "next/image";
import { createBeforeAfter, BeforeAfterGallery } from "@/components/gallery";

const beforeAfter = [
  createBeforeAfter("/images/haircut-stock.jpg", "/images/haircut-stock.jpg", "Haircut Transformation"),
  createBeforeAfter("/images/haircut-stock.jpg", "/images/haircut-stock.jpg", "Haircut Transformation"),
  createBeforeAfter("/images/haircut-stock.jpg", "/images/haircut-stock.jpg", "Haircut Transformation"),
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
