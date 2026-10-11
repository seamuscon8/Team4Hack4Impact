import { NextResponse } from "next/server";
import { mockBarber } from "@/data/barber";

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
