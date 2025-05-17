import SearchClientPage from "@/components/SearchClientPage";
import { fetchApartments } from "@/lib/api";

export default async function Home() {
  const apartments = await fetchApartments();

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <SearchClientPage initialApartments={apartments} />
    </main>
  );
}
