import express from 'express';
import { createFood, deleteFood, getAllFood, getFood, updateFood } from '../controllers/food';

const foodRouter = express.Router();

foodRouter.route('/').get(getAllFood).post(createFood);
foodRouter.route('/:id').get(getFood).put(updateFood).delete(deleteFood);

export { foodRouter };
