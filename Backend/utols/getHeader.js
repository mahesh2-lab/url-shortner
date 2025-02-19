import axios from "axios";
import { load } from "cheerio";
import { resolve } from "url";

export async function fetchHeaderData(siteUrl) {
  try {
    const { data } = await axios.get(siteUrl);
    const $ = load(data);

    // Get the title
    let headTitle = $("title").text() || "No Title Found";

    // Get the favicon
    let favicon =
      $("link[rel='icon']").attr("href") ||
      $("link[rel='shortcut icon']").attr("href");

    if (favicon) {
      if (!favicon.startsWith("http")) {
        favicon = resolve(siteUrl, favicon);
      }
    } else {
      favicon = `${new URL(siteUrl).origin}/favicon.ico`;
    }
    
    if(!headTitle) {
      headTitle = "Untitled";
    }

  if (headTitle.includes("Your browser is deprecated, please upgrade.")) {
    headTitle = headTitle.replace("Your browser is deprecated, please upgrade.", "").trim();
  }
    return { headTitle, favicon };
  } catch (error) {
    console.error("Error fetching site info:", error.message);
    return { headTitle: "Error", favicon: "" };
  }
}
