// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import bodyparser from "body-parser";

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
import productsRoutes from "./routes/product.js";
import userRoute from "./routes/user.js";
import cartRoutes from "./routes/cart.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";

dotenv.config();

const app = express();


// Allowed origins - add anything else you need here
const allowedOrigins = [
  "http://localhost:3000",
  "https://nyle-luxe.vercel.app",
  "https://nyle-admin.vercel.app",
  "https://nyle-store.onrender.com",
  "https://nyle-mobile.vercel.app"
];

// Quick debug toggle (set true temporarily to bypass CORS checks)
// WARNING: only enable temporarily for debugging — do NOT leave true in production.
const ALLOW_ALL_ORIGINS_FOR_DEBUG = false;

function normalizeOrigin(origin) {
  // trim whitespace and remove trailing slash if any
  if (!origin) return origin;
  return origin.trim().replace(/\/$/, "");
}

app.use((req, _res, next) => {
  // log every incoming origin (helps debugging on Render)
  console.log("🌍 Incoming request origin:", req.headers.origin);
  next();
});

if (ALLOW_ALL_ORIGINS_FOR_DEBUG) {
  console.warn("⚠️ ALLOW_ALL_ORIGINS_FOR_DEBUG is true — CORS is wide open (TEMPORARY)");
  app.use(cors({ origin: true, credentials: true })); // allow all
} else {
  app.use(
    cors({
      origin: function (origin, callback) {
        const orig = normalizeOrigin(origin);
        // If no origin header (server->server or same-origin request), allow it
        if (!orig) {
          return callback(null, true);
        }

        // exact match allowed
        if (allowedOrigins.includes(orig)) return callback(null, true);

        // allow Vercel preview domains (*.vercel.app) automatically
        try {
          if (/^https?:\/\/[A-Za-z0-9-]+\.vercel\.app$/.test(orig)) {
            return callback(null, true);
          }
        } catch (e) {
          // ignore
        }

        console.error("❌ Blocked by CORS:", orig);
        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
      // explicitly allow the headers we use (Authorization needed for JWT)
      allowedHeaders: ["Content-Type", "Authorization", "Accept"],
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );
}

// handle preflight globally
app.options("*", cors({ origin: true, credentials: true }));

// After this: body parsers, routes, etc.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// optional: convert CORS errors into a 403 JSON response (improves logs + client message)
app.use((err, _req, res, next) => {
  if (err && err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "Not allowed by CORS", error: err.message });
  }
  next(err);
});


const PORT = process.env.PORT || 5000;
app.use(bodyparser.json());
app.use(express.json());

// Log every request (useful during debugging)
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

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

//  Customer & cart routes
app.use("/api/customer/orders", customerOrderRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoutes);

// Newsletter routes
app.use("/api/newsletter", newsletterRoutes);

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
