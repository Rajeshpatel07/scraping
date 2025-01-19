import fs from 'fs';
import { createPool, PoolOptions } from "mysql2/promise";
import path from 'path';
import {
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../utils/config.js";

const poolOptions: PoolOptions = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  connectionLimit: 10,
  multipleStatements: true
};

const setupDB = async (filePath: string): Promise<void> => {
  const db = createPool(poolOptions);
  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    const commands = sql.split(";").map(command => command.trim()).filter(command => command);

    for (const command of commands) {
      try {
        await db.query(`${command};`);
      } catch (err) {
        console.error('Error executing SQL command:', err);
      }
    }

    console.log("migrations created succesfully");

  } catch (err) {
    console.error('Error reading SQL file:', err);
  } finally {
    db.end().catch(err => console.log(err));
  }
};

setupDB(path.join(import.meta.dirname, '../model/schema.sql'));

