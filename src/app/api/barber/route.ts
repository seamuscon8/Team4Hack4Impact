import { NextResponse } from "next/server";
import { mockBarber, type Barber } from "@/data/barber";

export async function GET() {
  return NextResponse.json(mockBarber, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { name, bio, imageUrl, services, workingHours } = body;

  if (!name || !bio || !imageUrl || !services || !workingHours) {
    return NextResponse.json({ message: "Required barber information is missing." }, { status: 400 });
  }

  const newBarber: Barber = {
    id: mockBarber.length + 1,
    name,
    bio,
    imageUrl,
    services,
    workingHours,
  };
  return NextResponse.json(newBarber, { status: 201 });
}
