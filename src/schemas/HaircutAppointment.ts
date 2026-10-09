import mongoose, { Schema, Model, models, model } from "mongoose";
import { HaircutAppointment } from "@/data/haircutappointment";

const appointmentStatuses = ["scheduled", "completed", "cancelled"] as const;

const HaircutAppointmentSchema = new Schema({
  appointmentNumber: {
    type: Number,
    required: [true, "appointmentNumber is required."],
    unique: true,
  },
  customerName: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    minLength: 1,
    maxLength: [30, "Name cannot exceed 30 characters."],
  },
  customerEmail: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    lowercase: true,
  },
  customerPhone: {
    type: String,
    required: [true, "Phone number is required."],
    set: (value: string) => value.replace(/\D/g, ""),
    match: [/^\d{10}$/, "Phone number must be 10 digits."],
  },
  appointmentDate: {
    type: Date,
    required: [true, "Appointment date is required."],
  },
  appointmentTime: {
    type: String,
    required: [true, "A valid time is required."],
  },
  service: {
    type: String,
    required: [true, "Service is required."],
    trim: true,
  },
  barberName: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: appointmentStatuses,
    required: true,
    default: "scheduled",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const HaircutAppointmentModel =
  (models.HaircutAppointment as Model<HaircutAppointment>) ||
  model<HaircutAppointment>("HaircutAppointment", HaircutAppointmentSchema);

export default HaircutAppointmentModel;
