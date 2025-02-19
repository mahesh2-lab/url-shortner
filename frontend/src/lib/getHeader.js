import axios from "axios";
import { load } from "cheerio";

export async function fetchHeaderData(siteUrl) {
  try {
    const { data } = await axios.get(siteUrl);
    const $ = load(data);
    
    const title = $("title").text();
    let favicon = $('link[rel="icon"]').attr("href") || $('link[rel="shortcut icon"]').attr("href");

    // Ensure full URL if the favicon uses a relative path
    if (favicon && !favicon.startsWith("http")) {
      const baseUrl = new URL(siteUrl).origin;
      favicon = baseUrl + (favicon.startsWith("/") ? "" : "/") + favicon;
    }

    console.log({ title, favicon });
  } catch (error) {
    console.error("Error fetching website data:", error.message);
  }
}

