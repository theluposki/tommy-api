import mariadb, { Pool, Connection } from "mariadb";
import config from "../config.ts";
import { createTables } from "./createTables.ts";

const pool: Pool = mariadb.createPool(config.mariadb);

pool
  .getConnection()
  .then((conn: Connection) => {
    console.log("[ DB ] Conexão estabelecida com sucesso.");
    conn.end();
  })
  .catch((err: any) => {
    console.error("[ DB ] Erro ao conectar-se ao banco de dados:", err);
  });

await createTables(pool);

export default pool;
