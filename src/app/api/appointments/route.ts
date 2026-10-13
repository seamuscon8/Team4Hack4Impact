import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import HaircutAppointmentModel from "@/schemas/HaircutAppointment";

export async function GET(request: Request) {
  try {
    await connectDB();

    const barberId = new URL(request.url).searchParams.get("barberId");

    if (barberId !== null) {
      const parsedBarberId = Number(barberId);

      if (!Number.isInteger(parsedBarberId) || parsedBarberId < 0) {
        return NextResponse.json({ message: "Invalid barber ID." }, { status: 400 });
      }

      const appointments = await HaircutAppointmentModel.find({ barberId: parsedBarberId });
      return NextResponse.json(appointments, { status: 200 });
    }

    const appointments = await HaircutAppointmentModel.find();

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
      !Number.isInteger(barberId) ||
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
      barberId,
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
