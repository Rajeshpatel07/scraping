import scrapSite from "./scraping.js";
import { getLastStory, addStories, getLatestStories } from "../model/db.js";
import { socket } from "../index.js";
import { scrapData, story } from "src/types/type.js";
import { INTERVEL } from "./config.js";

const cleanData = async (dbData: story, scrapedData: Array<scrapData>) => {
  for (let i = 0; i < scrapedData.length; i++) {
    if (scrapedData[i].time == dbData.postTime) {
      return scrapedData.slice(0, i);
    }
  }
  return scrapedData;
};

const removeDuplicate = async (cleanData: Array<scrapData>) => {
  const localData = await getLatestStories(10);

  const data = cleanData.filter(item => {
    //@ts-ignore
    return localData.forEach(record => {
      if (record.postTime == Number(item.time)) {
        return;
      }
    });
  });

  return data;
}

let messagesCount = 0;

export const getData = async () => {
  const db_data = await getLastStory();
  const scrapedData = await scrapSite();

  //@ts-ignore
  if (db_data.length > 0) {
    //@ts-ignore
    const cleanedData = await cleanData(db_data[0], scrapedData);
    const uniqueRecords = await removeDuplicate(cleanedData);

    if (uniqueRecords.length > 0) {
      addStories(uniqueRecords);
      messagesCount += uniqueRecords.length;
      socket.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            event: "newStories",
            count: messagesCount,
            stories: uniqueRecords,
          })
        );
      });
    }
  } else {
    addStories(scrapedData);
  }
  setTimeout(getData, 1000 * 60 * INTERVEL);
};

setInterval(() => messagesCount = 0, 1000 * 60 * 5)
