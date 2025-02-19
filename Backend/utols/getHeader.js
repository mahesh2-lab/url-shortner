import puppeteer from "puppeteer";

export async function fetchHeaderData(siteUrl) {
  try {
    if (!siteUrl) return { headTitle: "No URL provided", favicon: "" };

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(siteUrl, { waitUntil: "domcontentloaded" });

    const headTitle = await page.title();
    const favicon = await page.$eval('link[rel="icon"], link[rel="shortcut icon"]', el => el.href).catch(() => "");

    await browser.close();

    return { headTitle, favicon };

  } catch (error) {
    console.error("Error fetching website data:", error.message);
  }
}
