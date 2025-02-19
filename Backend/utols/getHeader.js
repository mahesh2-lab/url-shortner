import axios from "axios";
import { load } from "cheerio";

export async function fetchHeaderData(siteUrl) {
  try {
    if(!siteUrl) return { headTitle: "No URL provided", favicon: "" };
    const { data } = await axios.get(siteUrl);
    const $ = load(data);
    
    const headTitle = $("title").text();
    let favicon = $('link[rel="icon"]').attr("href") || $('link[rel="shortcut icon"]').attr("href");

    // Ensure full URL if the favicon uses a relative path
    if (favicon && !favicon.startsWith("http")) {
      const baseUrl = new URL(siteUrl).origin;
      favicon = baseUrl + (favicon.startsWith("/") ? "" : "/") + favicon;
    }

    return { headTitle, favicon };

  } catch (error) {
    console.error("Error fetching website data:", error.message);
  }
}

