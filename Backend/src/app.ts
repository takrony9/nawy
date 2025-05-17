import express, { Request, Response, NextFunction } from 'express';
import apartmentRoutes from './routes/apartmentRoutes';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api/apartments', apartmentRoutes);


// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'not set'
  });
});

// Error handling middleware
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ message: err.message || 'An unexpected error occurred' });
});

export default app;
