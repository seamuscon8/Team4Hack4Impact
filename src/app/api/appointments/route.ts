import { NextResponse } from "next/server";
import { mockAppointments, type HaircutAppointment } from "@/data/haircutappointment";
import connectDB from "@/database/db";
import HaircutAppointmentModel from "@/schemas/HaircutAppointment";

export async function GET(request: Request) {
  try {
    await connectDB();

    const barberId = new URL(request.url).searchParams.get("barberId");
    const appointments = await HaircutAppointmentModel.find(barberId ? { barberId: Number(barberId) } : {});

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unable to retrieve appointments." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const {
    customerName,
    customerEmail,
    customerPhone,
    appointmentDate,
    appointmentTime,
    service,
    barberId,
    barberName,
    price,
  } = body;

  if (
    !customerName ||
    !customerEmail ||
    !customerPhone ||
    !appointmentDate ||
    !appointmentTime ||
    !service ||
    !barberId ||
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
    barberId,
    barberName,
    status: "scheduled",
    price,
  };

  return NextResponse.json(newAppointment, { status: 201 });
}
