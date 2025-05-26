import express from "express";
import cors from "cors";
import { createClient } from "redis";
import { encodeBase62 } from "./services/helper.js";

const app = express();

app.use(cors());
app.use(express.json());

//Initialize Redis
const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("connect", () => {
  console.log("Redis is Connected");
});
redisClient.on("error", (err) => {
  console.log("Redis Connection Failed", err);
});

app.get("/", (req, res) => {
  res.send("Hello from Backend");
});

// Shorten URL
app.post("/api/shorten", async (req, res) => {
  const { longUrl } = req.body;
  console.log(req.body);
  if (!longUrl) {
    return res
      .status(400)
      .json({ status: false, error: "Long URL is required" });
  } else {
    try {
      const id = await redisClient.incr("counter");
      const shortUrl = encodeBase62(id);

      await redisClient.hSet("urls", shortUrl, longUrl);

      return res.status(200).json({
        status: true,
        shortUrl: `http://localhost:8000/${shortUrl}`,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: false, error: "Internal Server Error" });
    }
  }
});

// Redirect to Long URL
app.post("/api/original", async (req, res) => {
  const { shortUrl } = req.body;
  try {
    const longUrl = await redisClient.hGet("urls", shortUrl);
    if (!longUrl) {
      return res.status(404).json({ status: false, error: "URL not found" });
    }
    return res.status(200).json({
      status: true,
      longUrl: longUrl,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, error: "Internal Server Error" });
  }
});

// Redirect to Long URL
app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const longUrl = await redisClient.hGet("urls", shortUrl);
    if (!longUrl) {
      return res.status(404).json({ status: false, error: "URL not found" });
    }
    return res.status(301).redirect(longUrl);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, error: "Internal Server Error" });
  }
});

app.listen(8000, async () => {
  try {
    await redisClient.connect();
    console.log("Server is running on PORT 8000");
  } catch (error) {
    console.error(error);
  }
});
