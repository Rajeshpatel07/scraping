import puppeteer from "puppeteer-core";

async function scrapData() {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: false,
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
      const titleElement = rows[i]?.querySelector(".title > .titleline > a");
      const siteTitleElement = rows[i]?.querySelector(
        ".title > .titleline > span > a > span",
      );
      const siteLinkElement = rows[i]?.querySelector(
        ".title > .titleline > span > a",
      );
      const pointsElement = rows[i + 1]?.querySelector(".subtext > .score");
      const timeElement = rows[i + 1]?.querySelector(".subtext > .age");

      const data = {
        title: titleElement ? titleElement.innerText : "NULL",
        href: titleElement ? titleElement.href : "NULL",
        siteTitle: siteTitleElement ? siteTitleElement.innerText : "NULL",
        siteLink: siteLinkElement ? siteLinkElement.href : "NULL",
        points: pointsElement ? pointsElement.innerText : "NULL",
        time: timeElement ? timeElement.title : "NULL",
      };

      totalData.push(data);

      i += 2;
    }

    return totalData;
  });

  await browser.close();

  return data;
}

scrapData();
