import { describe, it, expect } from "vitest";
import HaircutAppointmentModel from "./HaircutAppointment";

describe("Haircut Appointment Validation", () => {
  // Creates an appointment with all required information.
  const validAppointment = {
    appointmentNumber: 1,
    customerName: "John Smith",
    customerEmail: "john@example.com",
    customerPhone: "8055551234",
    appointmentDate: new Date("2026-11-15"),
    appointmentTime: "10:00 AM",
    service: "Haircut",
    barberId: 1,
    barberName: "Mike",
    status: "scheduled",
    price: 25,
  };

  // Test 1: A valid appointment should pass validation.
  it("accepts an appointment with valid information", () => {
    const appointment = new HaircutAppointmentModel(validAppointment);

    const error = appointment.validateSync();

    expect(error).toBeUndefined();
  });

  // Test 2: A phone number with fewer than 10 digits should fail.
  it("rejects an appointment with an invalid phone number", () => {
    const appointment = new HaircutAppointmentModel({
      ...validAppointment,
      customerPhone: "12345",
    });

    const error = appointment.validateSync();

    expect(error).toBeDefined();
    expect(error?.errors.customerPhone).toBeDefined();
  });

  // Test 3: A negative appointment price should fail.
  it("rejects an appointment with a negative price", () => {
    const appointment = new HaircutAppointmentModel({
      ...validAppointment,
      price: -10,
    });

    const error = appointment.validateSync();

    expect(error).toBeDefined();
    expect(error?.errors.price).toBeDefined();
  });
});
