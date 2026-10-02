import Navbar from "@/components/Navbar";
import styles from "./before-and-after-page.module.css";
import Image from "next/image";
import { createBeforeAfter, BeforeAfterGallery } from "@/components/gallery.tsx";

export default function BeforeAndAfter() {
  const beforeAfter = createBeforeAfter(
    "/images/haircut-stock.jpg",
    "/images/haircut-stock.jpg",
    "Haircut Transformation",
  );

  return (
    <main>
      <Navbar />
      <BeforeAfterGallery beforeAfter={beforeAfter} />
    </main>
  );
}
