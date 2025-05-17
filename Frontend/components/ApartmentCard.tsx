import Link from "next/link";
import { Apartment } from "@/types/apartment";

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  return (
    <Link href={`/apartment/${apartment.id}`}>
      <div className="border p-4 rounded-lg shadow hover:bg-gray-100 transition">
        <h2 className="text-xl font-bold">{apartment.title}</h2>
        <p>{apartment.projectName} - Unit {apartment.unitNumber}</p>
      </div>
    </Link>
  );
}
