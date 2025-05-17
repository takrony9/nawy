import Link from "next/link";
import Image from "next/image";
import { Apartment } from "@/types/apartment";

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  const imageUrl = apartment.images && apartment.images.length > 0 
    ? `http://localhost:5000${apartment.images[0].imageUrl}` 
    : "/placeholder.png";

  return (
    <Link href={`/apartment/${apartment.id}`}>
      <div className="border rounded-lg shadow hover:bg-gray-100 transition text-black placeholder:text-gray-500">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={apartment.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">{apartment.title}</h2>
          <div className="flex justify-between items-center">
            <p>{apartment.projectName} - Unit {apartment.unitNumber}</p>
            <p className="font-semibold text-green-600">${apartment.price.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
