"use client";

import { type ChangeEvent, type FormEvent, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { mockAppointments } from "@/data/haircutappointment";
import FormField from "./FormField";
import styles from "./barber-page.module.css";

type Barber = {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
  services: string[];
  workingHours: string;
};
type FormValues = Omit<Barber, "id" | "services"> & { services: string };
type FormFieldName = keyof FormValues;
type FormErrors = Partial<Record<FormFieldName, string>>;

const workingHoursPattern =
  /^(?:Closed|(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?:-(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun))?,\s(?:1[0-2]|[1-9]):[0-5][0-9]\s(?:AM|PM)-(?:1[0-2]|[1-9]):[0-5][0-9]\s(?:AM|PM))$/;

const initialValues: FormValues = {
  name: "",
  bio: "",
  imageUrl: "",
  services: "",
  workingHours: "",
};
function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  (Object.keys(values) as FormFieldName[]).forEach((field) => {
    if (!values[field].trim()) errors[field] = "This field is required.";
  });
  if (values.imageUrl && !/^https?:\/\/\S+/.test(values.imageUrl)) errors.imageUrl = "Enter a valid image URL.";
  return errors;
}

export default function BarberDashboardPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);

  const selectedBarber = barbers.find((barber) => String(barber.id) === selectedBarberId);
  const appointments = useMemo(
    () => mockAppointments.filter((appointment) => appointment.barberName === selectedBarber?.name),
    [selectedBarber],
  );
  useEffect(() => {
    async function loadBarbers() {
      try {
        const response = await fetch("/api/barber");
        if (!response.ok) throw new Error("Unable to load barbers.");

        const data = (await response.json()) as Barber[];
        setBarbers(data);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "Unable to load barbers.");
      } finally {
        setLoading(false);
      }
    }

    void loadBarbers();
  }, []);

  const handleBarberChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const barber = barbers.find((item) => String(item.id) === event.target.value);
    setSelectedBarberId(event.target.value);
    setWorkingHours(barber?.workingHours ?? "");
    setMessage("");
  };
  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as FormFieldName;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const saveWorkingHours = () => {
    const value = workingHours.trim();

    if (!selectedBarber) return;

    if (!workingHoursPattern.test(value)) {
      setWorkingHours(selectedBarber.workingHours);
      setMessage("Use a format like “Mon-Sat, 9:00 AM-6:30 PM” or enter “Closed”.");
      return;
    }

    setBarbers((current) =>
      current.map((barber) => (barber.id === selectedBarber.id ? { ...barber, workingHours: value } : barber)),
    );

    setMessage("Working hours updated.");
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...values,
      name: values.name.trim(),
      bio: values.bio.trim(),
      imageUrl: values.imageUrl.trim(),
      services: values.services
        .split(",")
        .map((service) => service.trim())
        .filter(Boolean),
      workingHours: values.workingHours.trim(),
    };

    try {
      const response = await fetch("/api/barber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as Barber | { message: string };
      if (!response.ok) throw new Error("message" in data ? data.message : "Unable to add barber.");

      const barber = data as Barber;
      setBarbers((current) => [...current, barber]);
      setSelectedBarberId(String(barber.id));
      setWorkingHours(barber.workingHours);
      setValues(initialValues);
      setErrors({});
      setMessage(`${barber.name} was added.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to add barber.");
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
      <section className={styles.content} aria-labelledby="barber-dashboard-heading">
        <p className={styles.eyebrow}>Barbers</p>
        <h1 className={styles.heading} id="barber-dashboard-heading">
          Behind every chair...
        </h1>
        {loading ? (
          <p role="status">Loading barbers…</p>
        ) : loadError ? (
          <p role="alert">{loadError}</p>
        ) : (
          <>
            <div className={styles.barberPicker}>
              <label className={styles.eyebrow} htmlFor="barber">
                Barber:
              </label>
              <div className={styles.selectWrap}>
                <select
                  id="barber"
                  className={styles.barberSelect}
                  onChange={handleBarberChange}
                  value={selectedBarberId}
                >
                  <option value="">Select</option>

                  {barbers.map((barber) => (
                    <option key={barber.id} value={barber.id}>
                      {barber.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {barbers.length === 0 ? (
              <p>No barbers available. Add one below.</p>
            ) : selectedBarber ? (
              <>
                <section className={styles.barberCard}>
                  <h2 className={styles.barberName}>{selectedBarber.name}</h2>

                  {selectedBarber.bio && <p className={styles.bio}>{selectedBarber.bio}</p>}

                  <div className={styles.detailList}>
                    <div className={styles.detail}>
                      <span className={styles.detailLabel}>Services</span>
                      <span>{selectedBarber.services.join(", ")}</span>
                    </div>

                    <div className={styles.detail}>
                      <span className={styles.detailLabel}>Working hours</span>
                      <span>{selectedBarber.workingHours}</span>
                    </div>
                  </div>
                </section>
                <section className={styles.hoursEditor} aria-labelledby="edit-hours-heading">
                  <div>
                    <p className={styles.eyebrow}>Availability</p>
                    <h2 id="edit-hours-heading">Edit working hours</h2>
                    <p>Update {selectedBarber.name}&apos;s regular schedule.</p>
                  </div>

                  <div className={styles.hoursRow}>
                    <input
                      id="selectedWorkingHours"
                      onChange={(event) => setWorkingHours(event.target.value)}
                      value={workingHours}
                    />

                    <button type="button" onClick={saveWorkingHours}>
                      Save hours
                    </button>
                  </div>
                </section>

                <section className={styles.card}>
                  <h2>Appointments</h2>

                  {appointments.length ? (
                    <ul className={styles.appointments}>
                      {appointments.map((appointment) => (
                        <li key={appointment.appointmentNumber}>
                          <strong>{appointment.customerName}</strong> — {appointment.service},{" "}
                          {appointment.appointmentDate.toLocaleDateString()} at {appointment.appointmentTime}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No appointments for this barber.</p>
                  )}
                </section>
              </>
            ) : (
              <p>Select a barber to view their details and appointments.</p>
            )}
            {message && (
              <p className={styles.message} role="status">
                {message}
              </p>
            )}
            <section className={styles.addBarber}>
              <h2>Add a barber</h2>
              <form className={styles.form} noValidate onSubmit={handleSubmit}>
                <FormField error={errors.name} htmlFor="name" label="Name">
                  <input
                    {...errorProps("name")}
                    id="name"
                    name="name"
                    onChange={handleFormChange}
                    placeholder="Barber's full name"
                    value={values.name}
                  />
                </FormField>
                <FormField error={errors.bio} htmlFor="bio" label="Bio">
                  <input
                    {...errorProps("bio")}
                    id="bio"
                    name="bio"
                    placeholder="A short introduction and approach to haircuts..."
                    onChange={handleFormChange}
                    value={values.bio}
                  />
                </FormField>
                <FormField error={errors.services} htmlFor="services" label="Services (comma-separated)">
                  <input
                    {...errorProps("services")}
                    id="services"
                    name="services"
                    placeholder="e.g. fades, scissor cuts, natural texture"
                    onChange={handleFormChange}
                    value={values.services}
                  />
                </FormField>
                <FormField error={errors.workingHours} htmlFor="workingHours" label="Working hours">
                  <input
                    {...errorProps("workingHours")}
                    id="workingHours"
                    name="workingHours"
                    placeholder="Mon-Sat, 9:00 AM-6:30 PM"
                    onChange={handleFormChange}
                    value={values.workingHours}
                  />
                </FormField>
                <button className={styles.submitButton} type="submit">
                  Add barber
                </button>
              </form>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
