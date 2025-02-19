import express from "express";
import { sql } from "drizzle-orm";
import cron from "node-cron";
import {db} from "./src/db.js"
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cors from "cors";
import { Shorten, ShortId,getUserUrls, analyticsData } from "./controllers/urls.controller.js";
import { urlTable } from "./db/schema.js";
import { setUserCookie } from "./middlewere/setUserCookie.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies, authorization headers, etc.
  })
);
app.use(setUserCookie);  


// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  message: "Too many requests, please try again later.",
});
// app.use(limiter);

app.post("/api/shorten", Shorten);
app.get("/:shortId", ShortId);
app.get("/api/urls",getUserUrls);
app.get("/api/analytics", analyticsData);

app.get("/", (req, res) => {
  res.send("Welcome to the URL Shortener API");
});

cron.schedule('*/2 * * * *', async () => {
  console.log("Running link cleanup...");

  try {
    await db
      .delete(urlTable)
      .where(sql`${urlTable.createdAt} < NOW() - INTERVAL '30 days'`);

    console.log("Expired short links deleted.");
  } catch (error) {
    console.error("Error deleting expired links:", error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
