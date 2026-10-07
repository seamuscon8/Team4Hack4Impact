import mongoose, { Schema } from "mongoose";

const appointmentStatuses = ["scheduled", "completed", "cancelled"] as const;

const HaircutAppointmentSchema = new Schema({});
