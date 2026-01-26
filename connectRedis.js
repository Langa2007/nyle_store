import { Redis } from "ioredis";

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

redis.on("connect", () => {
  console.log(" Connected to Redis successfully!");
});

redis.on("error", (err) => {
  if (err.code === 'ECONNREFUSED') {
    console.warn(" Warning: Redis is not available at 127.0.0.1:6379. Some features like background email queuing will be disabled.");
  } else {
    console.error(" Redis connection error:", err.message);
  }
});

export default redis;
