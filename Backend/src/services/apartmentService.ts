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

export const searchApartments = async (filters: {
  title?: string;
  projectName?: string;
  unitNumber?: string;
}) => {
  const { title, projectName, unitNumber } = filters;

  return prisma.apartment.findMany({
    where: {
      AND: [
        title ? { title: { contains: title, mode: 'insensitive' } } : {},
        projectName ? { projectName: { contains: projectName, mode: 'insensitive' } } : {},
        unitNumber ? { unitNumber: { contains: unitNumber, mode: 'insensitive' } } : {},
      ],
    },
    include: { images: true },
  });
};
