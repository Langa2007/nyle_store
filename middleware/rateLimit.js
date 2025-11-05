// middleware/rateLimit.js
import rateLimit from "express-rate-limit";

export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 requests per IP
  message: { message: "Too many requests, please try again later." },
});

export const contactLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 min
  max: 10,
  message: { message: "Slow down — too many contact attempts." },
});
