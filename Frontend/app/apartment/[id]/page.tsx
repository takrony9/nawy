import { fetchApartmentById } from "@/lib/api";

export default async function ApartmentDetails({
  params,
}: {
  params: { id: string };
}) {
  const apartment = await fetchApartmentById(params.id);

  if (!apartment) return <p className="p-4">Apartment not found.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{apartment.title}</h1>
      <p className="text-gray-700">
        {apartment.projectName} - Unit {apartment.unitNumber}
      </p>
      <p className="mt-4">{apartment.description}</p>
    </div>
  );
}
