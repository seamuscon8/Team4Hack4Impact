import styles from "./gallery.module.css";
import Image from "next/image";

// Before and After

export type BeforeAfter = {
  before: string;
  after: string;
  name: string;
};

export function createBeforeAfter(before: string, after: string, name: string): BeforeAfter {
  return { before, after, name };
}

type BeforeAfterProps = {
  beforeAfter: BeforeAfter;
};

export function BeforeAfterGallery({ beforeAfter }: BeforeAfterProps) {
  return (
    <div className={styles.galleryCard}>
      <div className={styles.imageContainer}>
        <div className={styles.overlay}>
          <span className={styles.beforeText}>BEFORE</span>
          <span className={styles.afterText}>AFTER</span>
        </div>

        <Image
          src={beforeAfter.before}
          alt={`${beforeAfter.name} - Before`}
          width={290}
          height={250}
          className={styles.image}
        />
        <Image
          src={beforeAfter.after}
          alt={`${beforeAfter.name} - After`}
          width={290}
          height={250}
          className={styles.image}
        />
      </div>

      <h2 className={styles.label}>{beforeAfter.name}</h2>
    </div>
  );
}
