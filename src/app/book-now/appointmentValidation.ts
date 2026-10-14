export type FormValues = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  barberName: string;
  appointmentDate: string;
  appointmentTime: string;
};

export type FormFieldName = keyof FormValues;

export type FormErrors = Partial<Record<FormFieldName, string>>;

export const initialValues: FormValues = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  service: "",
  barberName: "",
  appointmentDate: "",
  appointmentTime: "",
};

export function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  (Object.keys(values) as FormFieldName[]).forEach((field) => {
    if (!values[field].trim()) {
      errors[field] = "This field is required.";
    }
  });

  if (values.customerEmail && !/^\S+@\S+\.\S+$/.test(values.customerEmail)) {
    errors.customerEmail = "Enter a valid email address.";
  }

  const phoneDigits = values.customerPhone.replace(/\D/g, "");

  if (values.customerPhone && phoneDigits.length !== 10) {
    errors.customerPhone = "Enter a valid 10-digit phone number.";
  }

  return errors;
}
