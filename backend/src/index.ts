import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import nftRoutes from './routes/nftRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Routes
app.use('/api/nfts', nftRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});