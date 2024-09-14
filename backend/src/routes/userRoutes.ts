import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validateUserInput } from '../middleware/validation';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', validateUserInput, async (req, res, next) => {
  try {
    const { username, email, walletAddress } = req.body;
    const user = await prisma.user.create({
      data: {
        username,
        email,
        walletAddress,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: { nfts: true },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;