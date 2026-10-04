import connectDB from "@/database/db";
import { NextResponse } from "next/server";
import { HaircutAppointment } from "@/data/haircutappointment";
import { mockAppointments } from "@/data/haircutappointment";
import { Barber } from "@/data/barber";
import { mockBarber } from "@/data/barber";

/**
 * Example GET API route
 * @returns {message: string}
 */
export async function GET() {
  await connectDB();
  return NextResponse.json({ message: "Hello from the API!" });
}
