import styles from "./barber.module.css";

export type Barber = {
  name: string;
  hours: number;
  rating: number;
};

export function createBarber(name: string, hours: number, rating: number): Barber {
  return { name, hours, rating };
}

type BarberProps = {
  barber: Barber;
};

export function BarberCard({ barber }: BarberProps) {
  return (
    <div className={styles.card}>
      <h2>{barber.name}</h2>
      <p>
        {barber.hours}, rating {barber.rating}
      </p>
    </div>
  );
}
