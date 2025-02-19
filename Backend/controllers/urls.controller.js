import { nanoid } from "nanoid";
import { urlTable, analytics } from "../db/schema.js";
import { db } from "../src/db.js";
import { count, sql, desc, eq } from "drizzle-orm";
import useragent from "useragent"; // For device detection
import geoip from "geoip-lite"; // For location detection
import requestIp from "request-ip"; // For IP address detection
import { fetchHeaderData } from "../utols/getHeader.js";
import getCountryISO3  from "country-iso-2-to-3"

export const Shorten = async (req, res) => {
  try {
    const { originalUrl, title, back_half } = req.body;
    const ip = requestIp.getClientIp(req);
    const userId = req.cookies.userId;
    console.log(originalUrl);
    

    const { headTitle } = await fetchHeaderData(originalUrl);

    let shortId = (back_half || nanoid(6)).toLowerCase();

    // Check if back_half is already in use
    if (back_half) {
      const existing = await db
        .select()
        .from(urlTable)
        .where(eq(urlTable.shortId, back_half)) 
        .limit(1) 
        .then((res) => res[0]); 
      if (existing)
        return res.status(202).json({ message: "Back-half already taken" });
    }

    // Insert new short URL
    await db.insert(urlTable).values({
      shortId,
      originalUrl,
      title: title || headTitle || "Untitled",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expires in 30 days
      ipAddress: ip,
      userId,
      clicks: 0,
    });

    res.json({ shortUrl: { shortId } });
  } catch (error) {
    console.error("Error shortening URL:", error); // Add logging for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const ShortId = async (req, res) => {
  try {
    const { shortId } = req.params;
    const userAgentString = req.headers["user-agent"];
    const ip = requestIp.getClientIp(req);

    const referrer = req.headers["referer"] || "Direct";

    // Get Device Type
    const agent = useragent.parse(userAgentString);
    let deviceType = "Unknown";
    if (agent.device.toString() === "Other") {
      deviceType =
        agent.os.toString().includes("Windows") ||
        agent.os.toString().includes("Mac")
          ? "Desktop"
          : "Mobile";
    } else {
      deviceType = agent.device.toString();
    }

    const geo = geoip.lookup("152.56.0.193");
    console.log(geo);

    const country = getCountryISO3(geo?.country) || "Unknown";
    const region = geo?.region || "Unknown";

    const urlArray = await db
      .select()
      .from(urlTable)
      .where(eq(urlTable.shortId, shortId));

    const url = urlArray[0];

    await db.insert(analytics).values({
      urlId: url.id, // Link to URL table
      userAgent: userAgentString,
      ipAddress: ip,
      referrer,
      deviceType,
      country,
      region,
      clickedAt: new Date(),
    });

    if (!url) return res.status(404).json({ message: "URL not found" });

    if (url.expiresAt && url.expiresAt < new Date())
      return res.status(410).json({ message: "URL expired" });

    const update = await db
      .update(urlTable)
      .set({ clicks: url.clicks + 1 })
      .where(eq(urlTable.shortId, shortId));
   
    res.redirect(url.originalUrl);
    // res.json({ originalUrl: url.originalUrl });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserUrls = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    if (!userId)
      return res.status(401).json({ message: "User not recognized" });

    const userUrls = await db
      .select()
      .from(urlTable)
      .where(eq(urlTable.userId, userId))
      .limit(10);

    res.json({ urls: userUrls });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    if (!userId)
      return res.status(401).json({ message: "User not recognized" });

    const { shortId } = req.params;

    const urlArray = await db
      .select()
      .from(urlTable)
      .where(eq(urlTable.shortId, shortId));

    const url = urlArray[0];

    if (!url) return res.status(404).json({ message: "URL not found" });

    if (url.userId !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    await db.delete(urlTable).where(eq(urlTable.shortId, shortId));

    res.json({ message: "URL deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }

}

// export const analyticsData = async (req, res) => {
//   try {
//     const userId = req.cookies.userId;
//     if (!userId) return res.status(401).json({ message: "User not recognized" });

//     // Fetch all URLs created by the user
//     const userUrls = await db
//       .select({ id: urlTable.id })
//       .from(urlTable)
//       .where(eq(urlTable.userId, userId));

//     if (userUrls.length === 0) return res.status(404).json({ message: "No URLs found" });

//     // Extract URL IDs
//     const urlIds = userUrls.map((url) => url.id);

//     // Fetch analytics data for all URLs
//     const analyticsData = await db
//       .select()
//       .from(analytics)
//       .where(inArray(analytics.urlId, urlIds));

//     res.json({ analytics: analyticsData });
//   } catch (error) {
//     console.error("Error fetching analytics:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };


export const analyticsData = async (req, res) => {
  try {
    // Fetch total clicks over time (by date)
    const clicksByDate = await db
      .select({ 
        date: sql`DATE(${analytics.clickedAt})`, 
        totalClicks: count() 
      })
      .from(analytics)
      .groupBy(sql`DATE(${analytics.clickedAt})`)
      .orderBy(desc(count()));

    // Fetch top performing date (most clicks in a day)
    const topPerformingDate = await db
      .select({ 
        date: sql`DATE(${analytics.clickedAt})`, 
        totalClicks: count() 
      })
      .from(analytics)
      .groupBy(sql`DATE(${analytics.clickedAt})`)
      .orderBy(desc(count()))
      .limit(1);

    // Fetch clicks by device type
    const temp = await db
      .select({ deviceType: analytics.deviceType, totalClicks: count() })
      .from(analytics)
      .groupBy(analytics.deviceType)
      .orderBy(desc(count()));
    const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      
      const clicksByDevice = temp.map((item) => ({
        ...item,
        fill: getRandomColor(),
      }));

    // Fetch clicks by referrer
    const clicksByReferrer = await db
      .select({ referrer: analytics.referrer, totalClicks: count() })
      .from(analytics)
      .groupBy(analytics.referrer)
      .orderBy(desc(count()));

    // Fetch clicks by location
    const clicksByLocation = await db
      .select({ country: analytics.country, totalClicks: count() })
      .from(analytics)
      .groupBy(analytics.country)
      .orderBy(desc(count()));

    // Fetch top performing location (most clicks)
    const topPerformingLocation = await db
      .select({ country: analytics.country, totalClicks: count() })
      .from(analytics)
      .groupBy(analytics.country)
      .orderBy(desc(count()))
      .limit(1);

    res.json({
      success: true,
      data: {
        clicksByDate,
        topPerformingDate: topPerformingDate[0] || null,
        clicksByDevice,
        clicksByReferrer,
        clicksByLocation,
        topPerformingLocation: topPerformingLocation[0] || null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};