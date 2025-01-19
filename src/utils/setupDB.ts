
import fs from 'fs';
import { db } from '../model/db.js';
import path from 'path';

const setupDB = async (filePath: string): Promise<void> => {
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

