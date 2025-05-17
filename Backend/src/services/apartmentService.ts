import prisma from '../models/prisma';

export const createApartment = async (data: any) => {
  const { images, ...apartmentData } = data;
  return prisma.apartment.create({
    data: {
      ...apartmentData,
      images: {
        create: images || [],
      },
    },
    include: { images: true },
  });
};

export const getApartments = () => {
  return prisma.apartment.findMany({ include: { images: true } });
};

export const getApartmentById = (id: number) => {
  return prisma.apartment.findUnique({
    where: { id },
    include: { images: true },
  });
};

export const searchApartments = async (query: string) => {
  return prisma.apartment.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { projectName: { contains: query } },
        { unitNumber: { contains: query } },
      ],
    },
    include: { images: true },
  });
};

