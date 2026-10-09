import styles from "styles/barber.module.css";
import Image from "next/image";

export type Barber = {
  id: string;
  name: string;
  bio: string;
  services: string[];
  workingHours: Record<string, "open" | "closed" | "by appointment">;
  imageUrl: string;
};

export function createBarber(name: string, rating: number, bio: string, imageURL: string): Barber {
  return { id: "", name, bio, services: [], workingHours: {}, imageUrl: imageURL };
}

type BarberProps = {
  barber: Barber;
};

export function BarberCard({ barber }: BarberProps) {
  return (
    <div className={styles.card}>
      <Image src={barber.imageUrl} alt={barber.name} width={290} height={250} className={styles.barberImage} />

      <h2>{barber.name}</h2>
      <p>
        Services: {barber.services.join(", ")} <br />
        Working Hours:{" "}
        {Object.entries(barber.workingHours)
          .map(([day, status]) => `${day}: ${status}`)
          .join(", ")}
        <br />
      </p>
      <p className={styles.barberBio}>{barber.bio}</p>
    </div>
  );
}
