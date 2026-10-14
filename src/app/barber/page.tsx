"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FormField from "./FormField";
import styles from "./barber-page.module.css";
import { findBarberByName, isValidWorkingHours } from "@/lib/barberDashboard";

type Barber = {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
  services: string[];
  workingHours: string;
};

type Appointment = {
  appointmentNumber: string | number;
  customerName: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
};

type FormValues = Omit<Barber, "id" | "services"> & { services: string };
type FormFieldName = keyof FormValues;
type FormErrors = Partial<Record<FormFieldName, string>>;
type Feedback = { kind: "error" | "success"; text: string } | null;

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

  if (values.imageUrl && !/^https?:\/\/\S+/.test(values.imageUrl)) {
    errors.imageUrl = "Enter a valid image URL.";
  }

  if (values.workingHours && !isValidWorkingHours(values.workingHours)) {
    errors.workingHours = "Use a format like “Mon-Sat, 9:00 AM-6:30 PM” or enter “Closed”.";
  }

  return errors;
}

async function getErrorMessage(response: Response, fallback: string) {
  const data = (await response.json().catch(() => null)) as {
    message?: string;
  } | null;
  return data?.message ?? fallback;
}

export default function BarberDashboardPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState("");
  const [search, setSearch] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingHours, setIsSavingHours] = useState(false);

  const selectedBarber = barbers.find((barber) => String(barber.id) === selectedBarberId);
  useEffect(() => {
    async function loadBarbers() {
      try {
        const response = await fetch("/api/barbers");
        if (!response.ok) throw new Error(await getErrorMessage(response, "Unable to load barbers."));

        setBarbers((await response.json()) as Barber[]);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "Unable to load barbers.");
      } finally {
        setLoading(false);
      }
    }

    void loadBarbers();
  }, []);

  useEffect(() => {
    if (!selectedBarberId) {
      setAppointments([]);
      setAppointmentsError("");
      return;
    }

    let cancelled = false;

    async function loadAppointments() {
      setAppointmentsLoading(true);
      setAppointmentsError("");

      try {
        const response = await fetch(`/api/appointments?barberId=${encodeURIComponent(selectedBarberId)}`);
        if (!response.ok) throw new Error(await getErrorMessage(response, "Unable to load appointments."));

        const data = (await response.json()) as Appointment[];
        if (!cancelled) setAppointments(data);
      } catch (error) {
        if (!cancelled) {
          setAppointments([]);
          setAppointmentsError(error instanceof Error ? error.message : "Unable to load appointments.");
        }
      } finally {
        if (!cancelled) setAppointmentsLoading(false);
      }
    }

    void loadAppointments();
    return () => {
      cancelled = true;
    };
  }, [selectedBarberId]);

  const selectBarber = (barber: Barber) => {
    setSelectedBarberId(String(barber.id));
    setWorkingHours(barber.workingHours);
    setSearch(barber.name);
    setFeedback(null);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const barber = findBarberByName(barbers, value);

    setSearch(value);

    if (barber) {
      selectBarber(barber);
    } else if (selectedBarberId) {
      setSelectedBarberId("");
      setWorkingHours("");
    }
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as FormFieldName;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const saveWorkingHours = async () => {
    const value = workingHours.trim();
    if (!selectedBarber) return;

    if (!workingHoursPattern.test(value)) {
      setFeedback({
        kind: "error",
        text: "Use a format like “Mon-Sat, 9:00 AM-6:30 PM” or enter “Closed”.",
      });
      return;
    }

    setIsSavingHours(true);
    setFeedback(null);

    try {
      const response = await fetch(`/api/barbers/${selectedBarber.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workingHours: value }),
      });

      if (!response.ok) throw new Error(await getErrorMessage(response, "Unable to update working hours."));

      const updatedBarber = (await response.json()) as Barber;
      setBarbers((current) => current.map((barber) => (barber.id === updatedBarber.id ? updatedBarber : barber)));
      setWorkingHours(updatedBarber.workingHours);
      setFeedback({ kind: "success", text: "Working hours updated." });
    } catch (error) {
      setFeedback({
        kind: "error",
        text: error instanceof Error ? error.message : "Unable to update working hours.",
      });
    } finally {
      setIsSavingHours(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      name: values.name.trim(),
      bio: values.bio.trim(),
      imageUrl: values.imageUrl.trim(),
      services: values.services
        .split(",")
        .map((service) => service.trim())
        .filter(Boolean),
      workingHours: values.workingHours.trim(),
    };

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/barbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(await getErrorMessage(response, "Unable to add barber."));

      const barber = (await response.json()) as Barber;
      setBarbers((current) => [...current, barber]);
      setSelectedBarberId(String(barber.id));
      setWorkingHours(barber.workingHours);
      setValues(initialValues);
      setErrors({});
      setFeedback({ kind: "success", text: `${barber.name} was added.` });
    } catch (error) {
      setFeedback({
        kind: "error",
        text: error instanceof Error ? error.message : "Unable to add barber.",
      });
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
              <label className={styles.eyebrow} htmlFor="barber-search">
                Find a barber
              </label>
              <div className={styles.selectWrap}>
                <input
                  className={styles.barberSelect}
                  id="barber-search"
                  list="barber-options"
                  onChange={handleSearchChange}
                  placeholder="Start typing a name"
                  value={search}
                />
              </div>
              <datalist id="barber-options">
                {barbers.map((barber) => (
                  <option key={barber.id} value={barber.name} />
                ))}
              </datalist>
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
                      disabled={isSavingHours}
                      onChange={(event) => setWorkingHours(event.target.value)}
                      value={workingHours}
                    />
                    <button type="button" disabled={isSavingHours} onClick={saveWorkingHours}>
                      {isSavingHours ? "Saving…" : "Save hours"}
                    </button>
                  </div>
                </section>
                <section className={styles.card}>
                  <h2>Appointments</h2>
                  {appointmentsLoading ? (
                    <p role="status">Loading appointments…</p>
                  ) : appointmentsError ? (
                    <p role="alert">{appointmentsError}</p>
                  ) : appointments.length ? (
                    <ul className={styles.appointments}>
                      {appointments.map((appointment) => (
                        <li key={appointment.appointmentNumber}>
                          <strong>{appointment.customerName}</strong> — {appointment.service},{" "}
                          {new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.appointmentTime}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No appointments for this barber.</p>
                  )}
                </section>
              </>
            ) : (
              <p>
                {search
                  ? "Choose a barber from the matching suggestions."
                  : "Start typing a barber's name to view their details and appointments."}
              </p>
            )}
            {feedback && (
              <p className={styles.message} role={feedback.kind === "error" ? "alert" : "status"}>
                {feedback.text}
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
                    onChange={handleFormChange}
                    placeholder="A short introduction and approach to haircuts..."
                    value={values.bio}
                  />
                </FormField>
                <FormField error={errors.imageUrl} htmlFor="imageUrl" label="Image URL">
                  <input
                    {...errorProps("imageUrl")}
                    id="imageUrl"
                    name="imageUrl"
                    onChange={handleFormChange}
                    placeholder="https://example.com/barber.jpg"
                    value={values.imageUrl}
                  />
                </FormField>
                <FormField error={errors.services} htmlFor="services" label="Services (comma-separated)">
                  <input
                    {...errorProps("services")}
                    id="services"
                    name="services"
                    onChange={handleFormChange}
                    placeholder="e.g. fades, scissor cuts, natural texture"
                    value={values.services}
                  />
                </FormField>
                <FormField error={errors.workingHours} htmlFor="workingHours" label="Working hours">
                  <input
                    {...errorProps("workingHours")}
                    id="workingHours"
                    name="workingHours"
                    onChange={handleFormChange}
                    placeholder="Mon-Sat, 9:00 AM-6:30 PM"
                    value={values.workingHours}
                  />
                </FormField>
                <button className={styles.submitButton} disabled={isSubmitting} type="submit">
                  {isSubmitting ? "Adding…" : "Add barber"}
                </button>
              </form>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
