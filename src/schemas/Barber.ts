import { Schema, model, models, type Model } from "mongoose";
import type { Barber } from "@/data/barber";

const BarberSchema = new Schema<Barber>({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
    required: true,
  },
  workingHours: {
    type: String,
    required: true,
  },
});

const BarberModel = (models.Barber as Model<Barber>) || model<Barber>("Barber", BarberSchema);

export default BarberModel;
