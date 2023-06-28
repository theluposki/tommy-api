import { readFile } from "fs";

const filePath = "./create_tables.sql";

function readSQLFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(filePath, "utf8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

async function executeSQLCommands(
  connection: any,
  sqlCommands: string[]
): Promise<void> {
  try {
    for (const sqlCommand of sqlCommands) {
      await connection.query(sqlCommand);
    }
    console.log("[ DB ] Tabelas criadas com sucesso.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage: string = error.message;
      console.error(errorMessage);
    } else {
      console.error("Ocorreu um erro desconhecido");
    }
  }
}

async function createTables(connection: any): Promise<void> {
  try {
    const sqlScript = await readSQLFile(filePath);
    const sqlCommands = sqlScript
      .split(";")
      .map((command) => command.trim())
      .filter((command) => command);
    await executeSQLCommands(connection, sqlCommands);
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage: string = error.message;
      console.error(errorMessage);
    } else {
      console.error("Ocorreu um erro desconhecido");
    }
  }
}

export { createTables };
