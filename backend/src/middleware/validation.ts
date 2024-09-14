import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const nftSchema = Joi.object({
  creatorId: Joi.string().required(),
  contentUri: Joi.string().uri().required(),
  price: Joi.number().positive().required(),
});

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  walletAddress: Joi.string().required(),
});

export const validateNFTInput = (req: Request, res: Response, next: NextFunction) => {
  const { error } = nftSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateUserInput = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};