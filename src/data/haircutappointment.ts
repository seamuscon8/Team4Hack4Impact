export interface HaircutAppointment {
  appointmentNumber: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  appointmentDate: Date;
  appointmentTime: string;
  service: string;
  barberId: number;
  barberName: string;
  status: "scheduled" | "completed" | "cancelled";
  price: number;
}

export const mockAppointments: HaircutAppointment[] = [
  {
    appointmentNumber: 1,
    customerName: "Joe Smith",
    customerEmail: "joe@example.com",
    customerPhone: "8051281917",
    appointmentDate: new Date("2026-10-01"),
    appointmentTime: "9:30 AM",
    service: "High Taper Fade",
    barberId: 101,
    barberName: "Kevin Lee",
    status: "scheduled",
    price: 17.5,
  },
];
