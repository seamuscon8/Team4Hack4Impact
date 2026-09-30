import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1>Home</h1>
      <div>
        <label htmlFor="userEmail">Email Address:</label>
        <input type="email" id="userEmail" name="userEmail" required></input>
      </div>
      <div>
        <label htmlFor="userPhoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" required />
      </div>
      <div>
        <label htmlFor="barber">Barber:</label>
        <select id="barber" name="barber">
          <option value="barber1">Barber 1</option>
          <option value="barber2">Barber 2</option>
          <option value="barber3">Barber 3</option>
        </select>
      </div>
    </main>
  );
}
