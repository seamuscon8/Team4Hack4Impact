import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import Barber from "@/schemas/Barber";

export async function GET() {
  try {
    await connectDB();

    const barbers = await Barber.find();

    return NextResponse.json(barbers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to retrieve barbers." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, bio, imageUrl, services, workingHours } = body;

    if (!name || !bio || !imageUrl || !services || !workingHours) {
      return NextResponse.json({ message: "Required barber information is missing." }, { status: 400 });
    }
    const latestBarber = await Barber.findOne().sort({ id: -1 }).select("id").lean();

    const id = typeof latestBarber?.id === "number" ? latestBarber.id + 1 : 1;

    const newBarber = await Barber.create({
      id,
      name,
      bio,
      imageUrl,
      services,
      workingHours,
    });

    return NextResponse.json(newBarber, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Failed to create barber." }, { status: 500 });
  }
}
