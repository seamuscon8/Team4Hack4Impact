import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <a href="/book_now/" className="button-link">
        BOOK NOW
      </a>
    </main>
  );
}
