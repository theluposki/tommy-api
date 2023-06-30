import dotenv from "dotenv";
import { readFileSync } from "fs";
import { PoolConfig } from "mariadb";

dotenv.config();

interface Certificates {
  key: Buffer;
  cert: Buffer;
}

interface App {
  PORT: string | number;
  HOST?: string;
  baseUrl?: string;
}

interface Cors {
  origin: string;
  credentials: boolean;
}

const mariadbConfig: PoolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  connectionLimit: 5,
};

interface Config {
  production: string | undefined;
  certificates: Certificates;
  app: App;
  cors: Cors;
  mariadb: PoolConfig;
}

const config: Config = {
  production: process.env.PRODUCTION,
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
  mariadb: mariadbConfig,
};

export default config;
