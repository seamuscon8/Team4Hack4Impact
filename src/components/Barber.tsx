import styles from "styles/barber.module.css";
import Image from "next/image";

export type Barber = {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
  services: string[];
  workingHours: string;
};

export function createBarber(
  id: number,
  name: string,
  bio: string,
  imageUrl: string,
  services: string[],
  workingHours: string,
): Barber {
  return { id, name, bio, imageUrl, services, workingHours };
}

type BarberProps = {
  barber: Barber;
};

export function BarberCard({ barber }: BarberProps) {
  return (
    <div className={styles.card}>
      <Image src={barber.imageUrl} alt={barber.name} width={290} height={250} className={styles.barberImage} />

      <h2>{barber.name}</h2>
      <p className={styles.barberBio}>{barber.bio}</p>
      <h3>Services:</h3>
      <p>{barber.services.join(", ")}</p>
      <h3>Working Hours:</h3>
      <p>{barber.workingHours}</p>
    </div>
  );
}
