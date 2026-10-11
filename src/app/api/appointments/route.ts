import { NextResponse } from "next/server";
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

    const lastAppointment = await HaircutAppointmentModel.findOne().sort({
      appointmentNumber: -1,
    });

    const nextAppointmentNumber = lastAppointment ? lastAppointment.appointmentNumber + 1 : 1;

    const newAppointment = await HaircutAppointmentModel.create({
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
    console.error(error);

    return NextResponse.json({ message: "Failed to create appointment." }, { status: 500 });
  }
}
