import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import BarberModel from "@/schemas/barberSchema";

interface RouteProps {
  params: Promise<{ id: string }>;
}

function parseBarberid(id: string) {
  const bid = Number(id);

  return Number.isInteger(bid) && bid >= 0 ? bid : null;
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { id } = await params;
  const bid = parseBarberid(id);

  if (bid == null) {
    return NextResponse.json({ message: "Invalid barber ID." }, { status: 400 });
  }

  try {
    await connectDB();
    const barber = await BarberModel.findOne({ id: bid });
    if (!barber) {
      return NextResponse.json({ message: "barber not found" }, { status: 404 });
    }
    return NextResponse.json(barber, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unable to retrieve barber." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteProps) {
  const { id } = await params;
  const bid = parseBarberid(id);

  if (bid === null) {
    return NextResponse.json({ message: "Invalid barber ID." }, { status: 400 });
  }

  try {
    const { workingHours } = await request.json();

    const workingHoursPattern =
      /^(?:Closed|(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?:-(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun))?,\s(?:1[0-2]|[1-9]):[0-5][0-9]\s(?:AM|PM)-(?:1[0-2]|[1-9]):[0-5][0-9]\s(?:AM|PM))$/;

    if (typeof workingHours !== "string" || !workingHoursPattern.test(workingHours.trim())) {
      return NextResponse.json(
        {
          message: "Use a format like “Mon-Fri, 9:00 AM-1:00 PM” or enter “Closed”.",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const barber = await BarberModel.findOneAndUpdate(
      { id: bid },
      { workingHours: workingHours.trim() },
      { new: true },
    );

    if (!barber) {
      return NextResponse.json({ message: "Barber not found." }, { status: 404 });
    }

    return NextResponse.json(barber, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Unable to update barber." }, { status: 500 });
  }
}
