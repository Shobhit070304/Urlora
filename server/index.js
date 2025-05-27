import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { encodeBase62 } from "./services/helper.js";
import { Redis } from "@upstash/redis";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://linkly-orcin.vercel.app", // exact frontend domain
    credentials: true,
  })
);
app.use(express.json());

const MAX_RETRIES = 5;
let redisClient = null;

async function connectToRedis(retries = MAX_RETRIES) {
  while (retries > 0) {
    try {
      redisClient = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });

      await redisClient.ping();
      console.log("Connected to Redis successfully");
      return redisClient;
    } catch (error) {
      console.error(
        `Redis connection failed. Retries left: ${retries - 1}`,
        error
      );
      retries--;

      if (retries === 0) {
        console.error("Failed to connect to Redis after multiple attempts");
        return res.status(500).json({
          status: false,
          error: "Failed to connect to Redis after multiple attempts",
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

connectToRedis();

app.get("/", (req, res) => {
  res.send("Hello from Backend");
});

// Shorten URL
app.post("/api/shorten", async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) {
    return res
      .status(400)
      .json({ status: false, error: "Long URL is required" });
  } else {
    try {
      const id = await redisClient.incr("counter");
      const shortUrl = encodeBase62(id);
      await redisClient.hset("urls", {
        [shortUrl]: longUrl,
      });

      return res.status(200).json({
        status: true,
        shortUrl: process.env.BACKEND_URL + shortUrl,
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
  if (!shortUrl) {
    return res
      .status(400)
      .json({ status: false, error: "Short URL is required" });
  }
  try {
    const longUrl = await redisClient.hget("urls", shortUrl);
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
    const longUrl = await redisClient.hget("urls", shortUrl);
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
    // await redisClient.connect();
    console.log("Server is running on PORT 8000");
  } catch (error) {
    console.error(error);
  }
});
