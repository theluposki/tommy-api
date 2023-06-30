// src/app.ts
import express from "express";
import cors from "cors";

// src/config.ts
import dotenv from "dotenv";
import { readFileSync } from "fs";
dotenv.config();
var mariadbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  connectionLimit: 5
};
var config = {
  certificates: {
    key: readFileSync("./server.key"),
    cert: readFileSync("./server.crt")
  },
  app: {
    PORT: process.env.PORT ?? 3002,
    HOST: process.env.HOST,
    baseUrl: process.env.BASE_URL
  },
  cors: {
    origin: "https://localhost:5173",
    credentials: true
  },
  mariadb: mariadbConfig
};
var config_default = config;

// src/app.ts
import cookieParser from "cookie-parser";

// src/routes/infoRouter.ts
import { Router } from "express";
var router = Router();
router.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});
var infoRouter_default = router;

// src/routes/UserRouter.ts
import { Router as Router2 } from "express";

// src/db/mariadb.ts
import mariadb from "mariadb";

// src/db/createTables.ts
import { readFile } from "fs";
var filePath = "./create_tables.sql";
function readSQLFile(filePath2) {
  return new Promise((resolve, reject) => {
    readFile(filePath2, "utf8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
async function executeSQLCommands(connection, sqlCommands) {
  try {
    for (const sqlCommand of sqlCommands) {
      await connection.query(sqlCommand);
    }
    console.log("[ DB ] Tabelas criadas com sucesso.");
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      console.error(errorMessage);
    } else {
      console.error("Ocorreu um erro desconhecido");
    }
  }
}
async function createTables(connection) {
  try {
    const sqlScript = await readSQLFile(filePath);
    const sqlCommands = sqlScript.split(";").map((command) => command.trim()).filter((command) => command);
    await executeSQLCommands(connection, sqlCommands);
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message;
      console.error(errorMessage);
    } else {
      console.error("Ocorreu um erro desconhecido");
    }
  }
}

// src/db/mariadb.ts
var pool = mariadb.createPool(config_default.mariadb);
pool.getConnection().then((conn) => {
  console.log("[ DB ] Conex\xE3o estabelecida com sucesso.");
  conn.end();
}).catch((err) => {
  console.error("[ DB ] Erro ao conectar-se ao banco de dados:", err);
});
await createTables(pool);
var mariadb_default = pool;

// src/domain/entities/User/useCases/CreateUser.ts
import { randomUUID } from "crypto";

// src/utils/hashPassword.ts
import bcrypt from "bcryptjs";
var hash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

// src/domain/entities/User/useCases/CreateUser.ts
var createUser = ({
  email,
  password,
  confirmPassword,
  existingUser
}) => {
  if (existingUser)
    return { error: "user already exist" };
  if (!email)
    return { error: "email is required" };
  if (!password)
    return { error: "password is required" };
  if (!confirmPassword)
    return { error: "confirmPassword is required" };
  const id = randomUUID();
  if (password !== confirmPassword)
    return { error: "passwords do not match" };
  return {
    id,
    email,
    password: hash(password)
  };
};

// src/domain/entities/User/User.ts
var User = {
  createUser
};

// src/repositories/User/createUserRepository.ts
var createUserRepository = async ({
  email,
  password,
  confirmPassword
}) => {
  let conn;
  try {
    conn = await mariadb_default.getConnection();
    const existingUser = await conn.query(
      "SELECT email FROM users WHERE email=?",
      [email]
    );
    const user = await User.createUser({
      email,
      password,
      confirmPassword,
      existingUser: existingUser.length > 0
    });
    if (user.error)
      return user;
    const query1 = "INSERT INTO users (id, email, password) VALUES (?,?,?);";
    const row = await conn.query(query1, [user.id, user.email, user.password]);
    if (row.affectedRows === 1)
      return { success: "User successfully registered!" };
    return { error: "Unable to register user!" };
  } catch (error) {
    return { error: "An error occurred while creating a user" };
  } finally {
    if (conn) {
      conn.release();
    }
  }
};

// src/repositories/User/UserRepository.ts
var UserRepository = {
  createUserRepository
};

// src/controllers/User/CreateUserController.ts
var createUserController = async ({
  email,
  password,
  confirmPassword
}) => {
  const user = await UserRepository.createUserRepository({ email, password, confirmPassword });
  return user;
};

// src/controllers/User/UserController.ts
var UserController = {
  createUserController
};

// src/routes/UserRouter.ts
var router2 = Router2();
router2.post(
  "/",
  async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const result = await UserController.createUserController({ email, password, confirmPassword });
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.status(201).json(result);
  }
);
var UserRouter_default = router2;

// src/routes/index.ts
var v1 = "/v1";
function routes(app2) {
  app2.use(`${v1}/info`, infoRouter_default);
  app2.use(`${v1}/users`, UserRouter_default);
}
var routes_default = routes;

// src/app.ts
var app = express();
app.use(cors(config_default.cors));
app.use(cookieParser());
app.use(express.json());
app.use("/", express.static("src/public"));
routes_default(app);
var app_default = app;
export {
  app_default as default
};
//# sourceMappingURL=app.js.map