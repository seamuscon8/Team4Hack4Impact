import { NextResponse } from "next/server";
import { mockAppointments } from "@/data/haircutappointment";

interface RouteProps {
  params: Promise<{ appointmentNumber: string }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { appointmentNumber } = await params;

  const appointment = mockAppointments.find((item) => item.appointmentNumber === Number(appointmentNumber));

  if (!appointment) {
    return NextResponse.json({ message: "Appointment Not Found" }, { status: 404 });
  }
  return NextResponse.json(appointment, { status: 200 });
}
