"use client";

import { useState, useEffect } from "react";
import { Apartment } from "@/types/apartment";
import { searchApartments } from "@/lib/api";
import ApartmentCard from "./ApartmentCard";
import SearchBar from "./SearchBar";
import { SlidersHorizontal, Building, MapPin } from "lucide-react";

export default function SearchClientPage({
  initialApartments,
}: {
  initialApartments: Apartment[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [apartments, setApartments] = useState(initialApartments);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "newest">("newest");
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Get unique cities from apartments
  const cities = Array.from(new Set(apartments.map(apt => apt.cityName))).filter(Boolean);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setApartments(initialApartments);
      return;
    }

    const delayDebounce = setTimeout(() => {
      searchApartments(searchQuery).then(setApartments).catch(console.error);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Sort and filter apartments
  const filteredApartments = apartments
    .filter(apt => !selectedCity || apt.cityName === selectedCity)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          return (b.yearBuilt || 0) - (a.yearBuilt || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Search and Filters Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Building className="w-5 h-5" />
          <h1 className="text-xl font-semibold">Find Your Perfect Home</h1>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          {/* City Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="w-4 h-4 inline mr-1" />
              City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-2 border rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <SlidersHorizontal className="w-4 h-4 inline mr-1" />
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "price-asc" | "price-desc" | "newest")}
              className="w-full p-2 border rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-gray-600">
          <p className="text-sm">
            Showing <span className="font-semibold">{filteredApartments.length}</span> properties
          </p>
        </div>

        {filteredApartments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No apartments found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredApartments.map((apt) => (
              <ApartmentCard key={apt.id} apartment={apt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
