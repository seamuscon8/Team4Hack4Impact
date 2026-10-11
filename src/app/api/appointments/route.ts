import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import HaircutAppointment from "@/schemas/HaircutAppointment";

export async function GET() {
  try {
    await connectDB();

    const appointments = await HaircutAppointment.find();

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to retrieve appointments." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

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

    const lastAppointment = await HaircutAppointment.findOne().sort({
      appointmentNumber: -1,
    });

    const nextAppointmentNumber = lastAppointment ? lastAppointment.appointmentNumber + 1 : 1;

    const newAppointment = await HaircutAppointment.create({
      appointmentNumber: nextAppointmentNumber,
      customerName,
      customerEmail,
      customerPhone,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      service,
      barberName,
      status: "scheduled",
      price,
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create appointment." }, { status: 500 });
  }
}
