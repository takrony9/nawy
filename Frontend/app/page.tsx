import AddApartmentModal from "@/components/AddApartmentModal";
import SearchClientPage from "@/components/SearchClientPage";
import Navbar from "@/components/Navbar";
import { fetchApartments } from "@/lib/api";

export default async function Home() {
  const apartments = await fetchApartments();

  return (
    <>
      <Navbar />
      <main className="p-4 max-w-5xl mx-auto">
        <SearchClientPage initialApartments={apartments} />
        <AddApartmentModal />
      </main>
    </>
  );
}
