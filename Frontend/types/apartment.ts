export interface Apartment {
  id: number;
  title: string;
  description: string;
  bedrooms: number;
  cityName: string;
  areaName: string;
  price: number;
  unitNumber: string;
  projectName: string;
  bathrooms: number;
  yearBuilt?: number | null;
  area: number;
  features: string[];
  primaryImage?: string;
  images?: ApartmentImage[];
}

export interface ApartmentImage {
  id: number;
  url: string;
  isPrimary: boolean;
}