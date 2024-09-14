import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validateNFTInput } from '../middleware/validation';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', validateNFTInput, async (req, res, next) => {
  try {
    const { creatorId, contentUri, price } = req.body;
    const nft = await prisma.nFT.create({
      data: {
        creatorId,
        contentUri,
        price,
      },
    });
    res.status(201).json(nft);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const nfts = await prisma.nFT.findMany();
    res.json(nfts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const nft = await prisma.nFT.findUnique({
      where: { id },
    });
    if (!nft) {
      return res.status(404).json({ message: 'NFT not found' });
    }
    res.json(nft);
  } catch (error) {
    next(error);
  }
});

export default router;