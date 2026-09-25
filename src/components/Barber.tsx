import styles from "./barber.module.css";
import Image from "next/image";

export type Barber = {
  name: string;
  hours: number;
  rating: number;
  bio: string;
  image: string;
};

export function createBarber(name: string, hours: number, rating: number, bio: string, image: string): Barber {
  return { name, hours, rating, bio, image };
}

type BarberProps = {
  barber: Barber;
};

export function BarberCard({ barber }: BarberProps) {
  return (
    <div className={styles.card}>
      <Image src={barber.image} alt={barber.name} width={200} height={200} />

      <h2>{barber.name}</h2>
      <p>
        Hours: {barber.hours},<br />
        Rating (0-5): {barber.rating}
        <br />
        Bio: {barber.bio}
      </p>
    </div>
  );
}
