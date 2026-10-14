import { describe, expect, it } from "vitest";
import { findBarberByName, isValidWorkingHours } from "./barberDashboard";

describe("Barber Dashboard helpers", () => {
  it("finds a barber by name without considering letter case", () => {
    const barbers = [
      { id: 1, name: "Jordan Lee" },
      { id: 2, name: "Sam Cruz" },
    ];

    expect(findBarberByName(barbers, "  jOrDaN lEe ")).toEqual({
      id: 1,
      name: "Jordan Lee",
    });
  });

  it("returns no barber when the typed name is not available", () => {
    const barbers = [{ id: 1, name: "Jordan Lee" }];

    expect(findBarberByName(barbers, "Taylor Kim")).toBeUndefined();
  });

  it("accepts valid working hours", () => {
    expect(isValidWorkingHours("Mon-Fri, 9:00 AM-1:00 PM")).toBe(true);
  });

  it("rejects invalid working hours", () => {
    expect(isValidWorkingHours("weekdays, whenever")).toBe(false);
  });
});
