// src/index.ts
import https from "https";

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

// src/presentation/routes/infoRouter.ts
import { Router } from "express";
var router = Router();
router.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});
var infoRouter_default = router;

// src/presentation/routes/UserRouter.ts
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
async function createUser(email, password, confirmPassword, existingUser) {
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
}

// src/domain/entities/User/User.ts
var User = {
  createUser
};

// src/models/User/createUserModel.ts
async function createUserModel(email, password, confirmPassword) {
  let conn;
  try {
    conn = await mariadb_default.getConnection();
    const existingUser = await conn.query(
      "SELECT email FROM users WHERE email=?",
      [email]
    );
    const user = await User.createUser(
      email,
      password,
      confirmPassword,
      existingUser.length > 0
    );
    console.log(user);
    if (user.error)
      return user;
    const query1 = "INSERT INTO users (id, email, password) VALUES (?,?,?);";
    const row = await conn.query(query1, [user.id, user.email, user.password]);
    if (row.affectedRows === 1)
      return { success: "Usu\xE1rio registrado com sucesso!" };
  } catch (error) {
    return { error: "Ocorreu um erro na cria\xE7\xE3o de usu\xE1rio" };
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

// src/models/User/UserModel.ts
var UserModel = {
  createUserModel
};

// src/controllers/User/CreateUserController.ts
async function createUserController(email, password, confirmPassword) {
  const user = await UserModel.createUserModel(email, password, confirmPassword);
  return user;
}

// src/controllers/User/UserController.ts
var UserController = {
  createUserController
};

// src/presentation/routes/UserRouter.ts
var router2 = Router2();
router2.post(
  "/",
  async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const result = await UserController.createUserController(
      email,
      password,
      confirmPassword
    );
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.status(201).json(result);
  }
);
var UserRouter_default = router2;

// src/presentation/routes/index.ts
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

// src/index.ts
var server = https.createServer(config_default.certificates, app_default);
server.listen(config_default.app.PORT, () => {
  console.log(`[ APP ] Listening at \u{1F680}${config_default.app.HOST}:${config_default.app.PORT}`);
});
//# sourceMappingURL=index.js.map