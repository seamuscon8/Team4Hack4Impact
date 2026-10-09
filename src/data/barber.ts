export interface Barber {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
  services: string[];
  workingHours: string;
}

export const mockBarber: Barber[] = [
  {
    id: 101,
    name: "Kevin Lee",
    bio: "Fades are my highest priority!",
    imageUrl: "/images/barber1.jpg",
    services: ["High Taper Fade", "Low Taper Fade", "Mid Fade"],
    workingHours: "Mon-Sat, 9:00 AM-6:30 PM",
  },
];
