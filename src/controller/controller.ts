import { Request, Response } from "express";
import { getLatestStories } from "../model/db.js";

export const getStories = async (req: Request, res: Response) => {
  try {
    const stories = await getLatestStories(30);
    res.status(200).json({ stories });
    return;
  } catch (err) {
    res.status(500).json({ err: "unable to send stories" });
    return;
  }
};
