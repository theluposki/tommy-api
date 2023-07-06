// src/routes/infoRouter.ts
import { Router } from "express";
var router = Router();
router.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});
var infoRouter_default = router;

// src/routes/userRouter.ts
import { Router as Router2 } from "express";

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
var compare = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
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

// src/repositories/User/deleteUserRepository.ts
var deleteUserRepository = async ({
  id
}) => {
  let conn;
  try {
    conn = await mariadb_default.getConnection();
    const existingUser = await conn.query(
      "SELECT email FROM users WHERE id=?",
      [id]
    );
    const user = await User.deleteUser({
      id,
      existingUser: existingUser.length > 0
    });
    if (user.error)
      return user;
    const query = "DELETE FROM users WHERE id=?";
    const row = await conn.query(query, [user.id]);
    if (row.affectedRows === 1)
      return { sucess: "User deleted successfully!" };
    return { error: "Unable to delete user!" };
  } catch (error) {
    return { error: "An error occurred while deleting the user" };
  } finally {
    if (conn) {
      conn.release();
    }
  }
};

// src/utils/jwt.ts
import { readFileSync as readFileSync2 } from "fs";
import jwt from "jsonwebtoken";
var privateKey = readFileSync2("./server.key");
var publicKey = readFileSync2("server.key");
var sign = (userId) => {
  const tokenPayload = {
    id: userId,
    exp: Math.floor(Date.now() / 1e3) + 60 * 60
    // 1 hour
  };
  return jwt.sign(
    tokenPayload,
    privateKey.toString(),
    // Convert privateKey to string
    { algorithm: "RS256" }
  );
};
var verify = (token) => {
  const options = {
    algorithms: ["RS256"]
  };
  return jwt.verify(token, publicKey.toString(), options);
};

// src/repositories/User/authUserRepository.ts
var authUserRepository = async ({
  email,
  password
}) => {
  let conn;
  try {
    const user = User.authUser({
      email,
      password
    });
    if (user.error)
      return user;
    conn = await mariadb_default.getConnection();
    const existingUser = await conn.query("SELECT * FROM users WHERE email=?", [
      user.email
    ]);
    if (existingUser.length === 0)
      return { error: "Invalid email or password" };
    if (!compare(user.password, existingUser[0].password))
      return { error: "Invalid email or password" };
    if (user.error)
      return user;
    const token = sign(existingUser[0].id);
    return {
      sucess: "Autenticado com sucesso!",
      token
    };
  } catch (error) {
    return { error: "An error occurred while authenticating the user" };
  } finally {
    if (conn) {
      conn.release();
    }
  }
};

// src/repositories/User/userRepository.ts
var UserRepository = {
  createUserRepository,
  deleteUserRepository,
  authUserRepository
};

// src/controllers/User/createUserController.ts
var createUserController = async ({
  email,
  password,
  confirmPassword
}) => {
  const user = await UserRepository.createUserRepository({ email, password, confirmPassword });
  return user;
};

// src/controllers/User/deleteUserController.ts
var deleteUserController = async ({
  id
}) => {
  const user = await UserRepository.deleteUserRepository({ id });
  return user;
};

// src/controllers/User/authUserController.ts
var authUserController = async ({
  email,
  password
}) => {
  const user = await UserRepository.authUserRepository({ email, password });
  return user;
};

// src/controllers/User/UserController.ts
var UserController = {
  createUserController,
  deleteUserController,
  authUserController
};

// src/routes/userRouter.ts
var router2 = Router2();
router2.post(
  "/",
  async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const result = await UserController.createUserController({
      email,
      password,
      confirmPassword
    });
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.status(201).json(result);
  }
);
router2.post(
  "/auth",
  async (req, res) => {
    const { email, password } = req.body;
    const result = await UserController.authUserController({
      email,
      password
    });
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    res.status(200).json(result);
  }
);
router2.delete(
  "/:id",
  async (req, res) => {
    const id = req.params.id;
    const result = await UserController.deleteUserController({ id });
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.status(200).json(result);
  }
);
var userRouter_default = router2;

// src/routes/profileRouter.ts
import { Router as Router3 } from "express";

// src/entities/Profiles/useCases/createProfile.ts
import { randomUUID as randomUUID2 } from "crypto";
var createProfile = ({
  nickname,
  bio,
  picture,
  links,
  reqUserId
}) => {
  if (!nickname)
    return { error: "nickname is required" };
  if (!reqUserId)
    return { error: "reqUserId is required" };
  const id = randomUUID2();
  if (!bio)
    bio = "Write your biography. \u{1F4BB}";
  if (!picture)
    picture = "/default/avatar.png";
  if (links)
    links = JSON.stringify(links);
  if (!links)
    links = JSON.stringify(["link.com", "mylink.com"]);
  return {
    id,
    nickname,
    bio,
    picture,
    links,
    reqUserId
  };
};

// src/entities/Profiles/useCases/myProfile.ts
var myProfile = ({ reqUserId }) => {
  if (!reqUserId)
    return { error: "reqUserId is required" };
  return {
    reqUserId
  };
};

// src/entities/Profiles/useCases/findProfilesByNickname.ts
var findProfilesByNickname = ({
  reqUserId,
  nickname
}) => {
  if (!reqUserId)
    return { error: "reqUserId is required" };
  if (!nickname)
    return { error: "nickname is required" };
  return {
    reqUserId,
    nickname
  };
};

// src/entities/Profiles/profile.ts
var Profile = {
  createProfile,
  myProfile,
  findProfilesByNickname
};

// src/repositories/Profiles/createProfileRepository.ts
var createProfileRepository = async ({
  nickname,
  bio,
  picture,
  links,
  reqUserId
}) => {
  let conn;
  try {
    const profile = Profile.createProfile({
      nickname,
      bio,
      picture,
      links,
      reqUserId
    });
    if (profile.error)
      return profile;
    conn = await mariadb_default.getConnection();
    const profileAlreadyExists = await conn.query(
      "SELECT * FROM user_profiles WHERE user_id=?",
      [profile.reqUserId]
    );
    if (profileAlreadyExists.length > 0)
      return { error: "you already have a profile" };
    const row = await conn.query(
      `
	    INSERT INTO user_profiles
      (id, user_id, nickname, bio, picture, links)
      VALUES
      (?,?,?,?,?,?);
	    `,
      [
        profile.id,
        profile.reqUserId,
        profile.nickname,
        profile.bio,
        profile.picture,
        profile.links
      ]
    );
    if (row.affectedRows === 1)
      return { sucess: "Profile successfully added!", id: profile.id };
    return { error: "Unable to register user!" };
  } catch (error) {
    return { error: "Unable to add profile!" };
  } finally {
    if (conn)
      conn.release();
  }
};

// src/repositories/Profiles/myProfileRepository.ts
var myProfileRepository = async ({
  reqUserId
}) => {
  let conn;
  try {
    const profile = Profile.myProfile({
      reqUserId
    });
    if (profile.error)
      return profile;
    conn = await mariadb_default.getConnection();
    const existingProfile = await conn.query(
      "SELECT id, nickname, bio, picture, links, 'created_at', 'updated_at' FROM user_profiles WHERE user_id=?",
      [profile.reqUserId]
    );
    if (!existingProfile[0].id)
      return { error: "profile does not exist" };
    return { sucess: existingProfile[0] };
  } catch (error) {
    return { error: "could not find profile" };
  } finally {
    if (conn)
      conn.release();
  }
};

// src/repositories/Profiles/findProfilesByNicknameRepository.ts
var findProfilesByNicknameRepository = async ({
  reqUserId,
  nickname
}) => {
  let conn;
  try {
    const profile = Profile.findProfilesByNickname({
      reqUserId,
      nickname
    });
    if (profile.error)
      return profile;
    conn = await mariadb_default.getConnection();
    const existingProfile = await conn.query(
      `SELECT up.id, up.nickname, up.picture 
      FROM user_profiles AS up 
      INNER JOIN users AS u 
      ON u.id = up.user_id WHERE up.nickname like ?`,
      [`${profile.nickname}%`]
    );
    if (existingProfile.length === 0)
      return [];
    return { sucess: existingProfile[0] };
  } catch (error) {
    return { error: "could not find profile" };
  } finally {
    if (conn)
      conn.release();
  }
};

// src/repositories/Profiles/profileRepository.ts
var ProfileRepository = {
  createProfileRepository,
  myProfileRepository,
  findProfilesByNicknameRepository
};

// src/controllers/Profiles/createProfileController.ts
var createProfileController = async ({
  nickname,
  bio,
  picture,
  links,
  reqUserId
}) => {
  const profile = await ProfileRepository.createProfileRepository({ nickname, bio, picture, links, reqUserId });
  return profile;
};

// src/controllers/Profiles/myProfileController.ts
var myProfileController = async ({
  reqUserId
}) => {
  const profile = await ProfileRepository.myProfileRepository({ reqUserId });
  return profile;
};

// src/controllers/Profiles/findProfilesByNicknameController.ts
var findProfilesByNicknameController = async ({
  reqUserId,
  nickname
}) => {
  const profile = await ProfileRepository.findProfilesByNicknameRepository({ reqUserId, nickname });
  return profile;
};

// src/controllers/Profiles/profileController.ts
var ProfileController = {
  createProfileController,
  myProfileController,
  findProfilesByNicknameController
};

// src/middlewares/upload.ts
import multer from "multer";
import { randomUUID as randomUUID3 } from "crypto";
var storage = multer.diskStorage({
  destination: "src/uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${randomUUID3()}`;
    const fileName = `${uniqueSuffix}-${file.originalname}`;
    cb(null, fileName);
  }
});
var upload = multer({ storage });

// src/utils/formatFileSize.ts
var formatFileSize = (size) => {
  const kiloBytes = 1024;
  const megaBytes = kiloBytes * 1024;
  const gigaBytes = megaBytes * 1024;
  if (size < kiloBytes) {
    return size + " bytes";
  } else if (size < megaBytes) {
    const sizeInKB = (size / kiloBytes).toFixed(2);
    return sizeInKB + " KB";
  } else if (size < gigaBytes) {
    const sizeInMB = (size / megaBytes).toFixed(2);
    return sizeInMB + " MB";
  } else {
    const sizeInGB = (size / gigaBytes).toFixed(2);
    return sizeInGB + " GB";
  }
};

// src/utils/compressImage.ts
import sharp from "sharp";
var sizes = [150, 600, 1080];
var names = [];
var compressImage = async (filename, path) => {
  sizes.forEach(async (item) => {
    const compressedImagePath = `${item}-compressed_${filename}`;
    await sharp(path).resize({ width: item }).png({ quality: 80 }).toFile(`src/uploads/${compressedImagePath}`).then((data) => {
      console.log("data: ", data);
      names.push(compressedImagePath);
    });
  });
  return names;
};

// src/routes/profileRouter.ts
var router3 = Router3();
router3.post("/", async (req, res) => {
  const { nickname, bio, picture, links } = req.body;
  const userId = req.user.id;
  const result = await ProfileController.createProfileController({
    nickname,
    bio,
    picture,
    links,
    reqUserId: userId
  });
  if (result.error) {
    res.status(400).json({ error: result.error });
    return;
  }
  res.status(201).json(result);
});
router3.get("/myprofile", async (req, res) => {
  const userId = req.user.id;
  const result = await ProfileController.myProfileController({
    reqUserId: userId
  });
  if (result.error) {
    res.status(400).json({ error: result.error });
    return;
  }
  res.status(200).json(result);
});
router3.post("/find", async (req, res) => {
  const userId = req.user.id;
  const result = await ProfileController.findProfilesByNicknameController({
    reqUserId: userId,
    nickname: req.body.nickname
  });
  if (result.error) {
    res.status(400).json({ error: result.error });
    return;
  }
  res.status(200).json(result);
});
router3.post("/upload", upload.single("picture"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No files received." });
      return;
    }
    const compress = await compressImage(file.filename, file.path);
    console.log("compress: ", compress);
    const objImage = {
      fieldname: "picture",
      originalname: file?.originalname,
      filename: file?.filename,
      path: file?.path,
      size: formatFileSize(Number(file?.size)),
      compress
    };
    res.status(200).json({ sucess: objImage });
  } catch (error) {
    console.error("Error uploading and compressing the image:", error);
    res.status(500).json({ error: "Error uploading and compressing the image" });
  }
});
var profileRouter_default = router3;

// src/utils/dateExp.ts
var dateExp = (expire) => {
  const now = Math.floor(Date.now() / 1e3);
  const remainingTime = parseInt(expire) - now;
  const remainingMinutes = Math.floor(remainingTime / 60);
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingMinutesAfterLastHour = remainingMinutes % 60;
  if (remainingHours > 0) {
    return `The token expires in ${remainingHours} hours and ${remainingMinutesAfterLastHour} minutes`;
  } else if (remainingMinutesAfterLastHour > 0) {
    return `The token expires in ${remainingMinutesAfterLastHour} minutes`;
  } else {
    return "The token has expired";
  }
};

// src/middlewares/validToken.ts
var validateToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = verify(token);
      const now = Date.now().valueOf() / 1e3;
      if (decoded.exp < now) {
        res.status(401).json({ error: "Authentication failed: token expired" });
        return;
      }
      const authenticatedReq = req;
      authenticatedReq.user = {
        id: decoded.id,
        exp: dateExp(decoded.exp)
      };
      next();
    } catch (error) {
      res.status(401).json({ error: "Authentication failed: invalid token" });
    }
  } else {
    res.status(401).json({ error: "Authentication failed: token cookie missing" });
  }
};

// src/routes/index.ts
var v1 = "/v1";
function routes(app) {
  app.use(`${v1}/info`, infoRouter_default);
  app.use(`${v1}/users`, userRouter_default);
  app.use(`${v1}/profiles`, validateToken, profileRouter_default);
}
var routes_default = routes;
export {
  routes_default as default
};
//# sourceMappingURL=index.js.map