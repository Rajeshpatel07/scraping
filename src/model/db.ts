import { createPool, PoolOptions } from "mysql2/promise";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../utils/config.js";
import { scrapData } from "src/types/type.js";

const poolOptions: PoolOptions = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 10
};

export const db = createPool(poolOptions);


export const getAllStories = async () => {
  const [stories] = await db.query("SELECT * FROM story;");
  return stories;
};

export const getLatestStories = async (limit: number | null) => {
  const [stories] = await db.query(
    "SELECT * FROM story ORDER BY postedAt DESC LIMIT ?", [limit]
  );
  return stories;
};

export const addStories = (data: Array<scrapData>) => {
  data.forEach((item) => {
    db.query(
      "INSERT INTO story (title,link,siteTitle,siteLink,upvotes,postTime,postedAt) VALUES (?,?,?,?,?,?,?)",
      [
        item.title,
        item.link,
        item.siteTitle,
        item.siteLink,
        Number(item.upvotes),
        Number(item.time),
        item.postedAt,
      ]
    ).catch(err => console.log('duplicate record'));
  });
  return;
};

export const getLastStory = async () => {
  const data = await db.query(
    "SELECT * FROM story ORDER BY postedAt DESC LIMIT 1;"
  );
  return data[0];
};
