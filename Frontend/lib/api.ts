import { Apartment } from "@/types/apartment";

const API_BASE = "http://localhost:5000/api/apartments";

export async function fetchApartments(): Promise<Apartment[]> {
  const res = await fetch(`${API_BASE}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch apartments");
  return res.json();
}

export async function fetchApartmentById(id: string): Promise<Apartment | null> {
  const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function searchApartments(query: string): Promise<Apartment[]> {
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}
