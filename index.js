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

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

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

// ✅ Vendor authentication (signup, login, verify email)
app.use("/api/vendor/auth", vendorAuthRoutes);

// ✅ Vendor management (approve/reject, pending, etc.)
app.use("/api/vendors", vendorRoutes);

// ✅ Vendor product management
app.use("/api/vendor/products", vendorProductRoutes);

// ✅ Admin routes
app.use("/api/admin/vendors", adminVendorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminAuthRoutes);

// ✅ Customer & cart routes
app.use("/api/customer/orders", customerOrderRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoutes);

// Health check
app.get("/api", (req, res) => {
  res.status(200).send("API is running...");
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Nyle Store API 🚀");
});

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
