// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import bodyparser from "body-parser";
import {publicLimiter} from "./middleware/rateLimit.js";
import { contactLimiter } from "./middleware/rateLimit.js";
import {createBullBoard} from "@bull-board/api";
import {BullMQAdapter} from "@bull-board/api/bullMQAdapter";
import {ExpressAdapter} from "@bull-board/express";
import { emailQueue } from "./services/emailQueue.js";


// Import route files
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import vendorAuthRoutes from "./routes/vendorAuth.js";
import vendorProductRoutes from "./routes/vendorProducts.js";
import adminVendorRoutes from "./routes/adminVendors.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import customerOrderRoutes from "./routes/customerOrders.js";
import userRoute from "./routes/user.js";
import cartRoutes from "./routes/cart.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";


dotenv.config();

const app = express();



// ✅ Allowed origins — keep only active production & local URLs
const allowedOrigins = [
  "http://localhost:3000",           // Local admin/frontend dev
  "https://nyle-admin.vercel.app",   // Admin dashboard (TSX)
  "https://nyle-luxe.vercel.app",    // Main eCommerce frontend
  "https://nyle-store.onrender.com", // API backend (self-origin)
  "https://nyle-mobile.vercel.app",  // Mobile frontend (optional)
];

// ✅ Utility: normalize origin to prevent slash mismatches
function normalizeOrigin(origin) {
  return origin ? origin.trim().replace(/\/$/, "") : origin;
}

// ✅ CORS middleware
app.use((req, res, next) => {
  const origin = normalizeOrigin(req.headers.origin);
  console.log("🌍 Request Origin:", origin || "(none)");

  if (!origin || allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin || "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    // ✅ Handle preflight quickly
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }

    next();
  } else {
    console.warn("🚫 Blocked by CORS:", origin);
    res.status(403).json({ message: "CORS policy: Origin not allowed" });
  }
});

// ✅ Body parsers (always after CORS)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT || 5000;
app.use(bodyparser.json());
app.use(express.json());

// Log every request (useful during debugging)
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// --- BULL BOARD SETUP ---
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter: serverAdapter,
});

app.use(publicLimiter); // Apply rate limiting to all requests
app.use("/api/support/contact", contactLimiter); // Apply stricter rate limiting to contact route

// --- ROUTES ---
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

//  Vendor authentication (signup, login, verify email)
app.use("/api/vendor/auth", vendorAuthRoutes);

//  Vendor management (approve/reject, pending, etc.)
app.use("/api/vendors", vendorRoutes);

//  Vendor product management
app.use("/api/vendor/products", vendorProductRoutes);

// Admin authentication & management
app.use("/api/admin", adminAuthRoutes);       // must come first
app.use("/api/admin/vendors", adminVendorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/admin/queues", serverAdapter.getRouter()); // Bull Board UI

//  Customer & cart routes
app.use("/api/customer/orders", customerOrderRoutes);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoutes);

// Newsletter routes
app.use("/api/newsletter", newsletterRoutes);

// Support routes
app.use("/api/support", supportRoutes);

// FAQ routes
app.use("/api/faqs", faqRoutes);  

// Reported issues routes
app.use("/api/reports", reportRoutes);



// Health check
app.get("/api", (req, res) => {
  res.status(200).send("API is running...");
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Nyle Store API 🚀");
});


// --- Error Logger (for debugging database or route errors) ---
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", {
    message: err.message,
    stack: err.stack,
    query: err.query || null,
  });

  res.status(500).json({ error: "Internal Server Error", details: err.message });
})

// Connect DB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  }
};

startServer();
