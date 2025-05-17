import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as apartmentService from '../services/apartmentService';

export const addApartment : RequestHandler = async (req: Request, res: Response) => {
  try {
    const apartment = await apartmentService.createApartment(req.body);
    res.status(201).json(apartment);
  } catch (error) {
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