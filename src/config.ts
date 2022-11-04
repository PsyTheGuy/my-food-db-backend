import dotenv from 'dotenv';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;
const MONGO_URI: string = process.env.MONGO_URI || '';

const VALID_USERNAME: string = process.env.VALID_USERNAME || '';
const VALID_PASSWORD: string = process.env.VALID_PASSWORD || '';
const TOKEN_SECRET: string = process.env.TOKEN_SECRET || '';

export { PORT, MONGO_URI, VALID_USERNAME, VALID_PASSWORD, TOKEN_SECRET };
