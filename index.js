// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import { initDB } from "./db/init.js";
import bodyparser from "body-parser";
import { publicLimiter } from "./middleware/rateLimit.js";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
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
import customerOrderRoutes from "./routes/customerOrders.js";
import userRoute from "./routes/user.js";
import cartRoutes from "./routes/cart.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import authRoutes from "./routes/auth.js";
import passwordroutes from "./routes/passwordResetRoutes.js";
import userResetPasswordRoutes from "./routes/UserResetPasswordRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import vendorLeadRoutes from "./routes/vendorLeadRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";
import adminNotificationsRoutes from "./routes/adminNotifications.js";
import heroRoutes from "./routes/heroRoutes.js";
import wishlistRoutes from "./routes/wishlist.js";
import recentlyViewedRoutes from "./routes/recentlyViewed.js";



dotenv.config();

const app = express();
app.set("trust proxy", 1);
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  process.env.MOBILE_URL,
  "https://nyle-store.onrender.com",
  "https://nyle-admin.vercel.app",
  "https://nyle-luxe.vercel.app",
  "https://nyle-mobile.vercel.app",
].filter(Boolean);

// Main CORS middleware - Optimized for maximum browser compatibility (including Safari)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      // Check if origin is in the allowed list or is a local development origin
      const isLocalhost = origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        origin === 'http://localhost' ||
        origin === 'http://127.0.0.1';

      if (allowedOrigins.includes(origin) || isLocalhost) {
        return callback(null, true);
      }

      console.warn("Blocked CORS request from:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "X-Client-IP",
      "X-Requested-With",
      "Accept",
      "Origin"
    ],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// Enhanced preflight handler
app.options("*", (req, res) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cache-Control, X-Client-IP, X-Requested-With, Accept, Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Max-Age", "86400"); // Cache preflight for 24 hours
  }

  res.status(204).end();
});
//  Body parsers 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT || 5000;
app.use(bodyparser.json());
app.use(express.json());

// Log every request 
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

app.use("/api", publicLimiter); // Baseline limiter for all API endpoints

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

//  Vendor authentication (signup, login, verify email)
app.use("/api/vendor/auth", vendorAuthRoutes);
app.use("/api/password-reset", passwordroutes);

// Vendor management routes
app.use("/api/vendors", vendorRoutes);


//  Vendor product management
app.use("/api/vendor/products", vendorProductRoutes);

// Admin authentication & management
app.use("/api/admin/auth", adminAuthRoutes);       // must come first
app.use("/api/admin/vendors", adminVendorRoutes);
app.use("/api/admin/notifications", adminNotificationsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/admin/queues", serverAdapter.getRouter()); // Bull Board UI

//  Customer & cart routes
app.use("/api/customer/orders", customerOrderRoutes);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/user/password-reset", userResetPasswordRoutes);

// Newsletter routes
app.use("/api/newsletter", newsletterRoutes);

// Support routes
app.use("/api/support", supportRoutes);

// FAQ routes
app.use("/api/faqs", faqRoutes);

// Reported issues routes
app.use("/api/reports", reportRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/vendor-leads", vendorLeadRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/recently-viewed", recentlyViewedRoutes);




// Health check
app.get("/api", (req, res) => {
  res.status(200).send("API is running...");
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Nyle Store API ");
});


// Error Logger 
app.use((err, req, res, next) => {
  console.error(" SERVER ERROR:", {
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
    await initDB();
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to connect or initialize DB:", err);
    process.exit(1);
  }
};

startServer();
