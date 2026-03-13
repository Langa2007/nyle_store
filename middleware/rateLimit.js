// middleware/rateLimit.js
import rateLimit from "express-rate-limit";

const defaultHandler = (message) => (req, res) => {
  res.status(429).json({ message });
};

const createLimiter = ({ windowMs, max, message }) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: defaultHandler(message),
  });

// General public API limiter (global fallback — applied to all routes in index.js)
export const publicLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 120,
  message: "Too many requests, please try again later.",
});

// Auth endpoints — login, register, token verify
export const authLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: "Too many authentication attempts. Please try again later.",
});

// OTP sending endpoints (login/resend)
export const otpSendLimiter = createLimiter({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 5,
  message: "Too many OTP requests. Please wait before trying again.",
});

// Password reset endpoints
export const passwordResetLimiter = createLimiter({
  windowMs: 30 * 60 * 1000, // 30 min
  max: 6,
  message: "Too many password reset attempts. Please wait and try again.",
});

// Vendor application (signup)
export const vendorApplyLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "Too many vendor application attempts. Please try again later.",
});

// Contact / support messages
export const contactLimiter = createLimiter({
  windowMs: 30 * 60 * 1000, // 30 min
  max: 10,
  message: "Slow down, too many contact attempts.",
});

// Newsletter subscription
export const newsletterLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 8,
  message: "Too many newsletter requests. Please try again later.",
});

// Issue/bug reports (Strict: 3 per hour)
export const reportLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: "Daily limit reached for problem reports (3 per hour). If you have more issues, please call admin/support for assistance.",
});

// Cart mutations (add, update, remove, sync)
export const cartMutationLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 90,
  message: "Too many cart updates. Please slow down.",
});

// Order creation
export const orderCreationLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 20,
  message: "Too many order requests. Please try again later.",
});

// Search / product listing — prevent scraping
export const searchLimiter = createLimiter({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 60,
  message: "Too many search requests. Please slow down.",
});

// Admin action mutations (approve/reject/delete) — lower limit for safety
export const adminActionLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 60,
  message: "Too many admin actions. Please slow down.",
});

// Vendor product mutations (create, update, delete)
export const vendorMutationLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 40,
  message: "Too many product changes. Please slow down.",
});
