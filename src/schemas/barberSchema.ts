import mongoose, { Schema, models, model, Model } from "mongoose";
import { Barber } from "@/components/Barber";

const barberSchema = new Schema({
  id: {
    type: String,
    required: [true, "ID is required."],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    minLength: 2,
    maxLength: [100, "Name cannot exceed 100 characters."],
  },
  bio: {
    type: String,
    required: [true, "Bio is required."],
    trim: true,
    minLength: 10,
    maxLength: [200, "Bio cannot exceed 200 characters."],
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required."],
    trim: true,
  },
  services: {
    type: [String],
    required: [true, "Services are required."],
  },
  workingHours: {
    type: Map,
    of: {
      type: String,
      enum: ["open", "closed", "by appointment"],
    },
    required: [true, "Working hours are required."],
  },
});

const BarberModel = (models.Barber as Model<Barber>) || model<Barber>("Barber", barberSchema);

export default BarberModel;
