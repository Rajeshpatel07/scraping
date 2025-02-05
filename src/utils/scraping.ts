import puppeteer from "puppeteer-core";
import { EXECUTABLE } from "./config.js";

const scrapSite = async () => {
  const browser = await puppeteer.launch({
    executablePath: EXECUTABLE,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto("https://news.ycombinator.com/", {
    waitUntil: "domcontentloaded",
  });

  const data = await page.evaluate(() => {
    const tbodySelector =
      "#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr";

    const rows = document.querySelectorAll(tbodySelector);

    const totalData = [];

    for (let i = 0; i < rows.length - 2; i++) {
      const titleElement: HTMLAnchorElement | null = rows[i]?.querySelector(
        ".title > .titleline > a"
      );
      const siteTitleElement: HTMLSpanElement | null = rows[i]?.querySelector(
        ".title > .titleline > span > a > span"
      );
      const siteLinkElement: HTMLAnchorElement | null = rows[i]?.querySelector(
        ".title > .titleline > span > a"
      );
      const pointsElement: HTMLSpanElement | null =
        rows[i + 1]?.querySelector(".score");
      const timeElement: HTMLSpanElement | null =
        rows[i + 1]?.querySelector(".age");

      const data = {
        title: titleElement ? titleElement.innerText : "NULL",
        link: titleElement ? titleElement.href : "NULL",
        siteTitle: siteTitleElement ? siteTitleElement.innerText : "NULL",
        siteLink: siteLinkElement ? siteLinkElement.href : "NULL",
        upvotes: pointsElement ? pointsElement.innerText.split(" ")[0] : "0",
        time: timeElement ? timeElement.title.split(" ")[1] : Date.now(),
        postedAt: timeElement ? timeElement.title.split(" ")[0] : "NULL",
      };

      totalData.push(data);

      i += 2;
    }

    return totalData;
  });

  await browser.close();

  return data;
};

export default scrapSite;
