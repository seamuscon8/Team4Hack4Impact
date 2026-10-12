"use client";

import { type ChangeEvent, type FormEvent, useMemo, useState } from "react";
import FormField from "./FormField";
import Navbar from "@/components/Navbar";
import { mockBarber } from "@/data/barber";
import { type HaircutAppointment } from "@/data/haircutappointment";
import styles from "./book-now.module.css";

type FormValues = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  barberName: string;
  appointmentDate: string;
  appointmentTime: string;
};

type FormFieldName = keyof FormValues;
type FormErrors = Partial<Record<FormFieldName, string>>;

const initialValues: FormValues = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  service: "",
  barberName: "",
  appointmentDate: "",
  appointmentTime: "",
};

const appointmentTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  (Object.keys(values) as FormFieldName[]).forEach((field) => {
    if (!values[field].trim()) errors[field] = "This field is required.";
  });

  if (values.customerEmail && !/^\S+@\S+\.\S+$/.test(values.customerEmail)) {
    errors.customerEmail = "Enter a valid email address.";
  }

  if (values.customerPhone && !/^[0-9+()\-\s]{7,}$/.test(values.customerPhone)) {
    errors.customerPhone = "Enter a valid phone number.";
  }

  return errors;
}

export default function BookNowPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedAppointment, setSubmittedAppointment] = useState<HaircutAppointment | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedBarber = useMemo(
    () => mockBarber.find((barber) => barber.name === values.barberName),
    [values.barberName],
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
          barberName: values.barberName,
          price: 0,
        }),
      });

      const createdAppointment = await response.json();

      if (!response.ok) {
        setSubmitError(createdAppointment.message ?? "Could not submit your appointment.");
        return;
      }

      setSubmittedAppointment({
        ...createdAppointment,
        appointmentDate: new Date(createdAppointment.appointmentDate),
      });
    } catch {
      setSubmitError("Could not reach the server. Please try submitting again.");
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
                  {mockBarber.map((barber) => (
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
