"use client";

import { type ChangeEvent, type FormEvent, useMemo, useState, useEffect } from "react";
import FormField from "./FormField";
import Navbar from "@/components/Navbar";
import type { Barber } from "@/schemas/barberSchema";
import styles from "./book-now.module.css";
import type { HaircutAppointment } from "@/data/haircutappointment";
import { initialValues, validate, type FormErrors, type FormFieldName, type FormValues } from "./appointmentValidation";

const appointmentTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export default function BookNowPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedAppointment, setSubmittedAppointment] = useState<HaircutAppointment | null>(null);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBarbers() {
      try {
        const response = await fetch("/api/barbers", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load barbers.");
        }

        const data: Barber[] = await response.json();

        if (!controller.signal.aborted) {
          setBarbers(data);
        }
      } catch {
        if (!controller.signal.aborted) {
          setSubmitError("Unable to load barbers.");
        }
      }
    }

    void fetchBarbers();
    return () => controller.abort();
  }, []);

  const selectedBarber = useMemo(
    () => barbers.find((barber) => barber.name === values.barberName),
    [barbers, values.barberName],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const field = name as FormFieldName;

    setValues((current) => ({
      ...current,
      [field]: value,
      ...(field === "barberName" ? { service: "" } : {}),
    }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setSubmitError(null);

    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!selectedBarber) {
      setSubmitError("Please select a valid barber.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: values.customerName.trim(),
          customerEmail: values.customerEmail.trim(),
          customerPhone: values.customerPhone.trim(),
          appointmentDate: values.appointmentDate,
          appointmentTime: values.appointmentTime,
          service: values.service,
          barberId: selectedBarber.id,
          barberName: selectedBarber.name,
          price: 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.message ?? "Could not submit appointment.");
        return;
      }

      setSubmittedAppointment({
        ...data,
        appointmentDate: new Date(data.appointmentDate),
      });
    } catch {
      setSubmitError("Could not reach the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorProps = (field: FormFieldName) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    className: errors[field] ? styles.inputError : undefined,
  });

  return (
    <main className={styles.page}>
      <Navbar />
      <section className={styles.content} aria-labelledby="book-now-heading">
        <p className={styles.eyebrow}>Appointments</p>
        <h1 className={styles.heading} id="book-now-heading">
          Book your next cut.
        </h1>
        <p className={styles.intro}>
          Choose your service, barber, and preferred time. We&apos;ll confirm your request shortly.
        </p>

        {submittedAppointment ? (
          <div className={styles.confirmation} role="status">
            <h2>Appointment request received!</h2>
            <p>Thanks, {submittedAppointment.customerName}. Your appointment request has been submitted.</p>
            <div className={styles.details}>
              <span>
                <strong>{submittedAppointment.service}</strong> with {submittedAppointment.barberName}
              </span>
              <span>
                {submittedAppointment.appointmentDate.toLocaleDateString()} at {submittedAppointment.appointmentTime}
              </span>
            </div>
            <button className={styles.resetButton} type="button" onClick={() => setSubmittedAppointment(null)}>
              Book another appointment
            </button>
          </div>
        ) : (
          <form className={styles.form} noValidate onSubmit={handleSubmit}>
            <div className={styles.grid}>
              <div className={styles.fullWidth}>
                <FormField error={errors.customerName} htmlFor="customerName" label="Customer name">
                  <input
                    {...errorProps("customerName")}
                    id="customerName"
                    name="customerName"
                    onChange={handleChange}
                    value={values.customerName}
                  />
                </FormField>
              </div>

              <FormField error={errors.customerEmail} htmlFor="customerEmail" label="Email address">
                <input
                  {...errorProps("customerEmail")}
                  id="customerEmail"
                  name="customerEmail"
                  onChange={handleChange}
                  type="email"
                  value={values.customerEmail}
                />
              </FormField>

              <FormField error={errors.customerPhone} htmlFor="customerPhone" label="Phone number">
                <input
                  {...errorProps("customerPhone")}
                  id="customerPhone"
                  name="customerPhone"
                  onChange={handleChange}
                  type="tel"
                  value={values.customerPhone}
                />
              </FormField>

              <FormField error={errors.barberName} htmlFor="barberName" label="Barber">
                <select
                  {...errorProps("barberName")}
                  id="barberName"
                  name="barberName"
                  onChange={handleChange}
                  value={values.barberName}
                >
                  <option value="">Select a barber</option>
                  {barbers.map((barber) => (
                    <option key={barber.id} value={barber.name}>
                      {barber.name}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField error={errors.service} htmlFor="service" label="Service">
                <select
                  {...errorProps("service")}
                  disabled={!selectedBarber}
                  id="service"
                  name="service"
                  onChange={handleChange}
                  value={values.service}
                >
                  <option value="">{selectedBarber ? "Select a service" : "Choose a barber first"}</option>
                  {selectedBarber?.services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField error={errors.appointmentDate} htmlFor="appointmentDate" label="Appointment date">
                <input
                  {...errorProps("appointmentDate")}
                  id="appointmentDate"
                  min={new Date().toISOString().split("T")[0]}
                  name="appointmentDate"
                  onChange={handleChange}
                  type="date"
                  value={values.appointmentDate}
                />
              </FormField>

              <FormField error={errors.appointmentTime} htmlFor="appointmentTime" label="Appointment time">
                <select
                  {...errorProps("appointmentTime")}
                  id="appointmentTime"
                  name="appointmentTime"
                  onChange={handleChange}
                  value={values.appointmentTime}
                >
                  <option value="">Select a time</option>
                  {appointmentTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Request appointment"}
            </button>

            {submitError && <p role="alert">{submitError}</p>}
          </form>
        )}
      </section>
    </main>
  );
}
