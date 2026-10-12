import { NextResponse } from "next/server";
import { mockBarber } from "@/data/barber";
import connectDB from "@/database/db";
import BarberModel from "@/schemas/barberSchema";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { id } = await params;

  const barber = mockBarber.find((item) => item.id === Number(id));

  if (!barber) {
    return NextResponse.json({ message: "barber not found" }, { status: 404 });
  }
  return NextResponse.json(barber, { status: 200 });
}

export async function PUT(request: Request, { params }: RouteProps) {
  const { id } = await params;
  const { workingHours } = await request.json();

  if (
    !workingHours ||
    typeof workingHours !== "object" ||
    Array.isArray(workingHours) ||
    !Object.values(workingHours).every((hours) => typeof hours === "string")
  ) {
    return NextResponse.json({ message: "Invalid working hours." }, { status: 400 });
  }

  try {
    await connectDB();

    const barber = await BarberModel.findOneAndUpdate({ id: Number(id) }, { workingHours }, { new: true });

    if (!barber) {
      return NextResponse.json({ message: "Barber not found." }, { status: 404 });
    }

    return NextResponse.json(barber, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unable to update barber." }, { status: 500 });
  }
}
