import mysql from "mysql2/promise";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../service/config.js";

export const db = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

export const getAllStories = async () => {
  const [stories] = await db.query("SELECT * FROM story;");
  return stories;
};

export const getLatestStories = async () => {
  const [stories] = await db.query(
    "SELECT * FROM story ORDER BY postedAt DESC",
  );
  return stories;
};

export const addStories = (data) => {
  data.forEach(async (item) => {
    await db.query(
      "INSERT INTO story (title,link,site,upvotes,postTime,postedAt) VALUES (?,?,?,?,?,?)",
      [
        item.title,
        item.link,
        item.siteTitle,
        Number(item.upvotes),
        Number(item.time),
        item.postedAt,
      ],
    );
  });
  return;
};

export const getLastStory = async () => {
  const data = await db.query(
    "SELECT * FROM story ORDER BY postedAt DESC LIMIT 1;",
  );
  return data[0];
};
