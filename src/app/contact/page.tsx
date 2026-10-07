"use client";

export default function ContactPage() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Message submitted!");
  }

  return (
    <div>
      <h1>Contact Us</h1>

      <section>
        <h2>Shop Information</h2>
        <p>Address: 123 Main Street</p>
        <p>Phone: (805) 555-1234</p>
        <p>Email: contact@barbershop.com</p>

        <h3>Hours</h3>
        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p>Saturday: 9:00 AM - 4:00 PM</p>
        <p>Sunday: Closed</p>
      </section>

      <section>
        <h2>Send Us a Message</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" id="name" required />

          <br />
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input type="email" id="email" required />

          <br />
          <br />

          <label htmlFor="message">Message</label>
          <br />
          <textarea id="message" required />

          <br />
          <br />

          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}
