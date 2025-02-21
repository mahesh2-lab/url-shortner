import express from "express";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cors from "cors";
import {
  Shorten,
  ShortId,
  getUserUrls,
  analyticsData,
  deleteUrl,
} from "./controllers/urls.controller.js";
import morgan from "morgan";
import { setUserCookie } from "./middlewere/setUserCookie.js";
import path from "path";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(
  {
    origin: "http://localhost:5000",
    credentials: true,
  }
));


app.use(setUserCookie);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000000,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

app.get("/api/urls", getUserUrls);
app.get("/api/analytics", analyticsData);
app.delete("/api/url/:shortId", deleteUrl);
app.post("/api/shorten", Shorten);
app.get("/short/:shortId", ShortId);


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
