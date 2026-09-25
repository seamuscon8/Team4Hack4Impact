import styles from "./barber.module.css";

export type Barber = {
  name: string;
  hours: number;
  rating: number;
  bio: string;
};

export function createBarber(name: string, hours: number, rating: number, bio: string): Barber {
  return { name, hours, rating, bio };
}

type BarberProps = {
  barber: Barber;
};

export function BarberCard({ barber }: BarberProps) {
  return (
    <div className={styles.card}>
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
