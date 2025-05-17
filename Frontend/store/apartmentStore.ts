import { create } from "zustand";
import { Apartment } from "@/types/apartment";

interface ApartmentState {
  apartments: Apartment[];
  setApartments: (data: Apartment[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useApartmentStore = create<ApartmentState>((set) => ({
  apartments: [],
  setApartments: (data) => set({ apartments: data }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
