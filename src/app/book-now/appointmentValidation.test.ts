import { describe, expect, it } from "vitest";
import { initialValues, validate } from "./appointmentValidation";

describe("appointment validation", () => {
  it("accepts a complete valid appointment", () => {
    const errors = validate({
      customerName: "Miles Schulist",
      customerEmail: "miles@example.com",
      customerPhone: "(805) 555-1234",
      service: "Haircut",
      barberName: "Jordan",
      appointmentDate: "2026-10-20",
      appointmentTime: "10:00 AM",
    });

    expect(errors).toEqual({});
  });

  it("reports required fields when appointment information is missing", () => {
    const errors = validate(initialValues);

    expect(errors.customerName).toBe("This field is required.");
    expect(errors.appointmentTime).toBe("This field is required.");
  });

  it("rejects an invalid email address and phone number", () => {
    const errors = validate({
      customerName: "Miles Schulist",
      customerEmail: "not-an-email",
      customerPhone: "555-123",
      service: "Haircut",
      barberName: "Jordan",
      appointmentDate: "2026-10-20",
      appointmentTime: "10:00 AM",
    });

    expect(errors.customerEmail).toBe("Enter a valid email address.");
    expect(errors.customerPhone).toBe("Enter a valid 10-digit phone number.");
  });
});
