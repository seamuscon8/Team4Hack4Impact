import { describe, it, expect } from "vitest";
import BarberModel from "./barberSchema";

describe("Barber Validation", () => {
  // Verify that a barber must have a name.
  it("rejects a barber with a missing name", () => {
    const barber = new BarberModel({
      id: 1,
      bio: "Experienced barber specializing in modern haircuts.",
      imageUrl: "/images/barber.jpg",
      services: ["Haircut", "Beard Trim"],
      workingHours: {
        monday: "9:00 AM - 5:00 PM",
      },
    });

    const error = barber.validateSync();

    expect(error).toBeDefined();
    expect(error?.errors.name).toBeDefined();
  });
});
