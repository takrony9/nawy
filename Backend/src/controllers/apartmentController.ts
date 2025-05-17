import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as apartmentService from '../services/apartmentService';

export const addApartment: RequestHandler = async (req: Request, res: Response) => {
  try {
    const apartmentData = {
      title: req.body.title,
      projectName: req.body.projectName,
      unitNumber: req.body.unitNumber,
      description: req.body.description,
      price: parseFloat(req.body.price),
      area: parseFloat(req.body.area),
      yearBuilt: parseInt(req.body.yearBuilt),
      cityName: req.body.cityName,
      areaName: req.body.areaName,
      bedrooms: parseInt(req.body.bedrooms),
      bathrooms: parseInt(req.body.bathrooms),
    };

    // Handle uploaded files
    const files = req.files as Express.Multer.File[];
    const images = files ? files.map(file => ({
      imageUrl: `/uploads/${file.filename}`,
    })) : [];

    const apartment = await apartmentService.createApartment({
      ...apartmentData,
      images
    });

    res.status(201).json(apartment);
  } catch (error) {
    console.error('Error creating apartment:', error);
    res.status(500).json({ error: 'Failed to create apartment' });
  }
};

export const getAllApartments : RequestHandler = async (_req: Request, res: Response) => {
  try {
    const apartments = await apartmentService.getApartments();
    res.status(200).json(apartments);
  } catch {
    res.status(500).json({ error: 'Failed to get apartments' });
  }
};

export const getApartmentById : RequestHandler = async (req: Request, res: Response) => {
  try {
    const apartment = await apartmentService.getApartmentById(Number(req.params.id));
    if (!apartment) res.status(404).json({ error: 'Apartment not found' });
    res.status(200).json(apartment);
  } catch {
    res.status(500).json({ error: 'Failed to get apartment' });
  }
};

export const searchApartments : RequestHandler = async (req: Request, res: Response) => {
  try {
    const query = req.query.q?.toString();
    if (!query) {
      res.status(400).json({ error: 'Search query (q) is required.' });
    }
    const results = await apartmentService.searchApartments(query ?? "");

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
};