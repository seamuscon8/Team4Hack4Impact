import Navbar from "@/components/Navbar";
import type { HaircutAppointment } from "@/data/haircutData";
import { mockAppointments } from "@/data/haircutData";
import { mockBarber } from "@/data/haircutData";
export default function Home() {
  return (
    <main>
      <Navbar />
      <h1>Home</h1>
      <h2>Appointments</h2>
      {mockAppointments.map((appointment) => (
        <article key={appointment.appointmentnumber}>
          <h3>{appointment.customerName}</h3>
          <p>Service: {appointment.service}</p>
          <p>Barber: {appointment.barberName}</p>
          <p>Date: {appointment.appointmentDate.toLocaleDateString()}</p>
          <p>Time: {appointment.appointmentTime}</p>
          <p>Status: {appointment.status}</p>
          <p>Price: ${appointment.price}</p>
        </article>
      ))}
      <h2>Barbers</h2>
      {mockBarber.map((barber) => (
        <article key={barber.id}>
          <h3>{barber.name}</h3>
          <p>Biography: {barber.bio}</p>
          <p>Image: {barber.imageUrl}</p>
          <p>Services: {barber.services.join(", ")}</p>
          <p>Working Hours: {barber.workingHours}</p>
        </article>
      ))}
    </main>
  );
}
