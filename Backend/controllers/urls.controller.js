import { nanoid } from "nanoid";
import { urlTable, analytics } from "../db/schema.js";
import { db } from "../src/db.js";
import { count, sql, desc, eq} from "drizzle-orm";
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
    res.status(500).json({ message: " Server error in shorten link", error: error.message });
  }
};

export const ShortId = async (req, res) => {
  try {
    const { shortId } = req.params;
    const userAgentString = req.headers["user-agent"] || "Unknown";
    const ip = requestIp.getClientIp(req) || "0.0.0.0";
    const referrer = req.headers["referer"] || "Direct";

    const agent = useragent.parse(userAgentString);
    let deviceType = "Unknown";
    if (agent.device.toString() === "Other") {
      deviceType = /Windows|Mac/.test(agent.os.toString()) ? "Desktop" : "Mobile";
    } else {
      deviceType = agent.device.toString();
    }

    const geo = geoip.lookup(ip) || {};
    const country = getCountryISO3(geo.country) || "Unknown";
    const region = geo.region || "Unknown";
    console.log(shortId);
    
    const urlArray = await db.select().from(urlTable).where(eq(urlTable.shortId, shortId));
    // console.log(urlArray);
    if (!urlArray.length) return res.status(404).json({ message: "URL not found" });

    const url = urlArray[0];

    if (url.expiresAt && url.expiresAt < new Date())
      return res.status(410).json({ message: "URL expired" });

    await db.insert(analytics).values({
      urlId: url.id,
      userAgent: userAgentString,
      ipAddress: ip,
      referrer,
      deviceType,
      country,
      region,
      clickedAt: new Date(),
    });

    await db.update(urlTable).set({ clicks: url.clicks + 1 }).where(eq(urlTable.shortId, shortId));

    if (!url.originalUrl) return res.status(500).json({ message: "Invalid URL" });
    
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error in ShortId:", error);
    res.status(500).json({ message: "Server error in ShortId", error: error.message });
  }
};

export const getUserUrls = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    if (!userId)
      return res.status(401).json({ message: "User not recognized" });

    const { page = 1, limit = 5 } = req.query; 
    console.log(req.query);
    
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;
    

    const userUrls = await db
      .select()
      .from(urlTable)
      .where(eq(urlTable.userId, userId))
      .orderBy(desc(urlTable.createdAt)) // Assuming createdAt is the timestamp column
      .limit(limitInt)
      .offset(offset)
      

      const result = await db
      .select({ count: sql`COUNT(*)` })
      .from(urlTable)
      .where(eq(urlTable.userId, userId));
    
    const totalUrls = result[0]?.count || 0;

  
    res.json({
      urls: userUrls,
      pagination: {
        total: parseInt(totalUrls),
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalUrls / limitInt),
      },
    });
  } catch (error) {
    console.error("Error fetching user URLs:", error);
    res.status(500).json({ message: "Server error in get links", error: error.message });
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