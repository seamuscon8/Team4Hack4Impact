import type { ReactNode } from "react";
import styles from "./FormField.module.css";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
};

export default function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error && (
        <p className={styles.error} id={`${htmlFor}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
