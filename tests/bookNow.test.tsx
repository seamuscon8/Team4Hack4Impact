import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookNowPage from "../src/app/book-now/page";

beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(global, "fetch");
});

async function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText("Customer name"), {
    target: { value: "McSparkleButt" },
  });

  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "sunshinefarts@gmail.com" },
  });

  fireEvent.change(screen.getByLabelText("Phone number"), {
    target: { value: "5555555555" },
  });

  fireEvent.change(screen.getByLabelText("Barber"), {
    target: { value: "Kevin Lee" },
  });

  fireEvent.change(screen.getByLabelText("Service"), {
    target: { value: "High Taper Fade" },
  });

  fireEvent.change(screen.getByLabelText("Appointment date"), {
    target: { value: "2026-10-20" },
  });

  fireEvent.change(screen.getByLabelText("Appointment time"), {
    target: { value: "10:00 AM" },
  });
}

describe("BookNowPage", () => {
  it("shows validation errors when fields are empty", async () => {
    render(<BookNowPage />);

    fireEvent.click(screen.getByText("Request appointment"));

    const errors = await screen.findAllByText("This field is required.");
    expect(errors.length).toBe(7);
  });

  it("shows email validation error", async () => {
    render(<BookNowPage />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByText("Request appointment"));

    const error = await screen.findByText("Enter a valid email address.");
    expect(error).toBeTruthy();
  });

  it("shows phone validation error", async () => {
    render(<BookNowPage />);

    fireEvent.change(screen.getByLabelText("Phone number"), {
      target: { value: "abc" },
    });

    fireEvent.click(screen.getByText("Request appointment"));

    const error = await screen.findByText("Enter a valid phone number.");
    expect(error).toBeTruthy();
  });
});
