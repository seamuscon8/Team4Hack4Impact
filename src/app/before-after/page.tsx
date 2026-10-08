import Navbar from "@/components/Navbar";
import styles from "./before-after-page.module.css";
import { createBeforeAfter, BeforeAfterGallery } from "@/components/gallery";

const beforeAfter = [
  createBeforeAfter("/images/before-after/ba-1-before.jpg", "/images/before-after/ba-1-after.jpg", "Awesome Haircut 1"),
  createBeforeAfter("/images/before-after/ba-2-before.jpg", "/images/before-after/ba-2-after.jpg", "Awesome Haircut 2"),
  createBeforeAfter("/images/before-after/ba-3-before.jpg", "/images/before-after/ba-3-after.jpg", "Awesome Haircut 3"),
  createBeforeAfter("/images/before-after/ba-4-before.jpg", "/images/before-after/ba-4-after.jpg", "Awesome Haircut 4"),
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
