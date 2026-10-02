import { NextResponse } from "next/server";
import { mockAppointments, type HaircutAppointment } from "@/data/haircutappointment";

export async function GET() {
  return NextResponse.json(mockAppointments, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { customerName, customerEmail, customerPhone, appointmentDate, appointmentTime, service, barberName, price } =
    body;

  if (
    !customerName ||
    !customerEmail ||
    !customerPhone ||
    !appointmentDate ||
    !appointmentTime ||
    !service ||
    !barberName ||
    price === undefined
  ) {
    return NextResponse.json({ message: "Required appointment information is missing." }, { status: 400 });
  }

  const newAppointment: HaircutAppointment = {
    appointmentNumber: mockAppointments.length + 1,
    customerName,
    customerEmail,
    customerPhone,
    appointmentDate: new Date(appointmentDate),
    appointmentTime,
    service,
    barberName,
    status: "scheduled",
    price,
  };
  return NextResponse.json(newAppointment, { status: 201 });
}
