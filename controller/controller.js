import { getLatestStories } from "../model/db.js";

export const getStories = async (req, res, next) => {
  try {
    const stories = await getLatestStories();
    return res.status(200).json({ stories });
  } catch (err) {
    next(err);
  }
};
