import scrapSite from "./scraping.js";
import { getLastStory, addStories } from "../model/db.js";
import { socket } from "../index.js";
import { scrapData, story } from "src/types/type.js";
import { INTERVEL } from "./config.js";

const cleanData = async (dbData: story, scrapedData: Array<scrapData>) => {
  for (let i = 0; i < scrapedData.length; i++) {
    if (
      scrapedData[i].time == dbData.postTime &&
      scrapedData[i].title != dbData.title
    ) {
      return scrapedData.slice(0, i);
    }
  }
};

export const getData = async () => {
  const db_data = await getLastStory();
  const scrapedData = await scrapSite();

  //@ts-ignore
  if (db_data.length > 0) {
    //@ts-ignore
    const cleanedData = await cleanData(db_data, scrapedData);

    console.log("cleanedData==> ", cleanedData);

    if (cleanedData) {
      addStories(cleanedData);

      socket.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            event: "newStories",
            stories: cleanedData,
          })
        );
      });
    }
  } else {
    addStories(scrapedData);
  }

  setTimeout(getData, 1000 * 60 * INTERVEL);
};
