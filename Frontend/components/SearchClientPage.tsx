"use client";

import { useState, useEffect } from "react";
import { Apartment } from "@/types/apartment";
import { searchApartments } from "@/lib/api";
import ApartmentCard from "./ApartmentCard";
import SearchBar from "./SearchBar";

export default function SearchClientPage({
  initialApartments,
}: {
  initialApartments: Apartment[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [apartments, setApartments] = useState(initialApartments);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setApartments(initialApartments);
      return;
    }

    const delayDebounce = setTimeout(() => {
      searchApartments(searchQuery).then(setApartments).catch(console.error);
    }, 400); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <div className="mt-4 space-y-4">
        {apartments.map((apt) => (
          <ApartmentCard key={apt.id} apartment={apt} />
        ))}
      </div>
    </div>
  );
}
