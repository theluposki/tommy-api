import dotenv from 'dotenv';
import { readFileSync } from "node:fs";

dotenv.config();

export default {
  certificates: {
    key: readFileSync("./server.key"),
    cert: readFileSync("./server.crt"),
  },
  app: {
    PORT: process.env.PORT ?? 3002,
    HOST: process.env.HOST,
    baseUrl: process.env.BASE_URL,
  },
  cors: {
    origin: "https://localhost:5173",
    credentials: true,
  },
  mariadb: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 5,
  },
};
