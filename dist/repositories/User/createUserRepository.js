// src/db/mariadb.ts
import mariadb from "mariadb";

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
  production: process.env.PRODUCTION,
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

// src/entities/User/useCases/createUser.ts
import { randomUUID } from "crypto";

// src/utils/hashPassword.ts
import bcrypt from "bcryptjs";
var hash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

// src/entities/User/useCases/createUser.ts
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

// src/entities/User/useCases/deleteUser.ts
var deleteUser = ({
  id,
  existingUser
}) => {
  if (!id)
    return { error: "id is required!" };
  if (!existingUser)
    return { error: "User not found!" };
  return {
    id,
    existingUser
  };
};

// src/entities/User/useCases/authUser.ts
var authUser = ({ email, password }) => {
  if (!email)
    return { error: "email is required" };
  if (!password)
    return { error: "password is required" };
  return {
    email,
    password
  };
};

// src/entities/User/user.ts
var User = {
  createUser,
  deleteUser,
  authUser
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
      return { sucess: "User successfully registered!", id: user.id };
    return { error: "Unable to register user!" };
  } catch (error) {
    return { error: "An error occurred while creating a user" };
  } finally {
    if (conn) {
      conn.release();
    }
  }
};
export {
  createUserRepository
};
//# sourceMappingURL=createUserRepository.js.map