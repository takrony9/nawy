import { fetchApartmentById } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, MapPinIcon, BedSingleIcon, BathIcon, RulerIcon } from "lucide-react";

export default async function ApartmentDetails({
  params,
}: {
  params: { id: string };
}) {
  const apartment = await fetchApartmentById(params.id);

  if (!apartment) return <p className="p-4">Apartment not found.</p>;

  // Prepare image array with placeholders if needed
  const images = [];
  if (apartment.images && apartment.images.length > 0) {
    images.push(`http://localhost:5000${apartment.images[0].imageUrl}`);
    if (apartment.images.length > 1) {
      images.push(`http://localhost:5000${apartment.images[1].imageUrl}`);
    }
  }
  while (images.length < 2) {
    images.push("/placeholder.png");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="max-w-7xl mx-auto p-4">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Listings
        </Link>
      </div>

      <main className="max-w-7xl mx-auto px-4 pb-12">
        {/* Image Gallery */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={imageUrl}
                alt={`Apartment view ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Location */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {apartment.title}
              </h1>
              <div className="flex items-center text-gray-600">
                <MapPinIcon className="w-5 h-5 mr-2" />
                <p>{apartment.projectName} - Unit {apartment.unitNumber}</p>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
              <div className="flex items-center gap-2">
                <BedSingleIcon className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                  <p className="font-semibold text-black placeholder:text-gray-500">{apartment.bedrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BathIcon className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Bathrooms</p>
                  <p className="font-semibold text-black placeholder:text-gray-500">{apartment.bathrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RulerIcon className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Area</p>
                  <p className="font-semibold text-black placeholder:text-gray-500">{apartment.area} m²</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {apartment.description}
              </p>
            </div>

            {/* Additional Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Year Built</p>
                  <p className="font-semibold text-black placeholder:text-gray-500">{apartment.yearBuilt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-semibold text-black placeholder:text-gray-500">{apartment.cityName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Area Name</p>
                  <p className="font-semibold text-black placeholder:text-gray-500">{apartment.areaName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-3xl font-bold text-green-600">
                  ${apartment.price.toLocaleString()}
                </p>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
