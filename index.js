// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";

// Import route files (ESM style)
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";            // vendor profile management
import vendorAuthRoutes from "./routes/vendorAuth.js";      // vendor auth (signup/login)
import vendorProductRoutes from "./routes/vendorProducts.js"; // vendor product management
import adminVendorRoutes from "./routes/adminVendors.js";   // admin vendor management
import adminRoutes from "./routes/adminRoutes.js"; // combined admin routes
import adminAuthRoutes from "./routes/adminAuthRoutes.js"; // admin auth
import vendorRoutes from "./routes/vendorRoutes.js";
dotenv.config();

const app = express();
//Allow CORS for all origins (for development)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // allow both frontends
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// ✅ log every request
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});


// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/vendors", vendorAuthRoutes);  // ✅ handles /register & /login
app.use("/api/vendors", vendorRoutes);      // ✅ other vendor-related routes (profile, etc.)
app.use("/api/vendor/products", vendorProductRoutes); // ✅ vendor product management
app.use("/api/admin/vendors", adminVendorRoutes);     // ✅ admin vendor management
app.use("/api/admin", adminRoutes); // combined admin routes
app.use("/api/admin", adminAuthRoutes); // admin auth routes


// Home route (optional)
app.get("/", (req, res) => {
  res.send("Welcome to Nyle Store API 🚀");
});

// Connect DB and Start Server
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
