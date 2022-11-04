import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { FoodEntryCreateOptions, FoodEntryUpdateOptions, FoodEntry } from '../interfaces';
import Food from '../models/Food';
import { isValidCreateFoodJSON, isValidUpdateFoodJSON } from '../middleware/food-json-validation';

const getAllFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const entries: FoodEntry[] = await Food.find({});
    res.status(200).json({ entries });
  } catch {
    next(createHttpError(500, 'internal server error'));
  }
};

const getFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const entry: FoodEntry | null = await Food.findById(req.params.id);
    res.status(200).json({ status: 'found', entry: entry });
  } catch {
    next(createHttpError(500, 'internal server error'));
  }
};

const createFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (isValidCreateFoodJSON(req.body)) {
      const newFood: FoodEntryCreateOptions = req.body as FoodEntryCreateOptions;
      const entry: FoodEntry | null = await Food.create(newFood);
      res.status(200).json({ status: 'created', entry: entry });
    } else {
      next(createHttpError(500, 'internal server error'));
    }
  } catch {
    next(createHttpError(500, 'internal server error'));
  }
};

const updateFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (isValidUpdateFoodJSON(req.body)) {
      const newFood: FoodEntryUpdateOptions = req.body as FoodEntryUpdateOptions;
      const entry: FoodEntry | null = await Food.findByIdAndUpdate(req.params.id, newFood, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({ status: 'updated', entry: entry });
    } else {
      next(createHttpError(500, 'internal server error'));
    }
  } catch {
    next(createHttpError(500, 'internal server error'));
  }
};

const deleteFood = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const entry: FoodEntry | null = await Food.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'deleted', entry: entry });
  } catch {
    next(createHttpError(500, 'internal server error'));
  }
};

export { getAllFood, getFood, createFood, updateFood, deleteFood };
