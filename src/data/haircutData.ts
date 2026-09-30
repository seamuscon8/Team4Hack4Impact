export interface HaircutAppointment {
  appointmentnumber: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  appointmentDate: Date;
  appointmentTime: string;
  service: string;
  barberName: string;
  status: "scheduled" | "completed" | "cancelled";
  price: number;
}

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
    imageUrl: "/images/barbers/kevin-lee.jpg",
    services: ["High Taper Fade", "Low Taper Fade", "Mid Fade"],
    workingHours: "Mon-Sat, 9:00 AM-6:30 PM",
  },
];
export const mockAppointments: HaircutAppointment[] = [
  {
    appointmentnumber: 1,
    customerName: "Joe Smith",
    customerEmail: "joe@example.com",
    customerPhone: "8051281917",
    appointmentDate: new Date("2026-10-01"),
    appointmentTime: "9:30 AM",
    service: "High Taper Fade",
    barberName: "Kevin Lee",
    status: "scheduled",
    price: 17.5,
  },
];
