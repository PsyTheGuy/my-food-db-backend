import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { MONGO_URI, PORT } from './config';
import { foodRouter } from './routes/food';
import { loginRouter } from './routes/login';
import { tokenValidation } from './middleware/token-validation';
import { notFound } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';

const server = express();

server.use(express.json());
server.use(morgan('tiny'));

server.use(
  cors({
    origin: 'https://my-food-db-frontend.vercel.app/',
  }),
);

server.use('/api/v1/food', tokenValidation, foodRouter);
server.use('/login', loginRouter);
server.use(notFound);

server.use(errorHandler);

const main = async (): Promise<void> => {
  await mongoose.connect(MONGO_URI);
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
};

main().catch(console.error);
