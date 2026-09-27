import styles from "./barber.module.css";
import Image from "next/image";

export type Barber = {
  name: string;
  rating: number;
  bio: string;
  image: string;
};

export function createBarber(name: string, rating: number, bio: string, image: string): Barber {
  return { name, rating, bio, image };
}

type BarberProps = {
  barber: Barber;
};

export function BarberCard({ barber }: BarberProps) {
  return (
    <div className={styles.card}>
      <Image src={barber.image} alt={barber.name} width={290} height={250} className={styles.barberImage} />

      <h2>{barber.name}</h2>
      <p>
        Rating (0-5): {barber.rating}
        <br />
      </p>
      <p className={styles.barberBio}>{barber.bio}</p>
    </div>
  );
}
