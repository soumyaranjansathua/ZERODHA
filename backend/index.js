require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UsersModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "zerodha_clone_secure_jwt_secret_key_2026";

const app = express();

// --- MIDDLEWARES ---
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- HEALTH CHECK ROUTE (Fast response for Render cold starts / Uptime monitors) ---
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Zerodha Clone Backend API is running",
    uptime: Math.floor(process.uptime()),
    database: mongoose.connection.readyState === 1 ? "connected" : "connecting/disconnected",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: Math.floor(process.uptime()),
    database: mongoose.connection.readyState === 1 ? "connected" : "connecting/disconnected",
  });
});

// --- AUTHENTICATION MIDDLEWARE ---
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

// --- AUTH ROUTES ---

// 1. SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await UsersModel.findOne({
      $or: [{ email: normalizedEmail }, { username: username.trim() }],
    });

    if (existingUser) {
      if (existingUser.email === normalizedEmail) {
        return res.status(400).json({ message: "Email is already registered. Please log in." });
      }
      return res.status(400).json({ message: "Username is already taken. Please choose another." });
    }

    // Create user (password is automatically hashed by pre-save hook in UsersSchema)
    const newUser = new UsersModel({
      username: username.trim(),
      email: normalizedEmail,
      password,
    });

    await newUser.save();

    // Generate JWT token (7-day validity)
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, username: newUser.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error during registration", error: error.message });
  }
});

// 2. LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const identifier = (email || username || "").toLowerCase().trim();

    if (!identifier || !password) {
      return res.status(400).json({ message: "Email/Username and password are required." });
    }

    // Find by email or username
    const user = await UsersModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email/username or password." });
    }

    // Verify password using schema method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email/username or password." });
    }

    // Generate JWT token (7-day validity)
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error during login", error: error.message });
  }
});

// 3. GET CURRENT USER PROFILE
app.get("/user", verifyToken, async (req, res) => {
  try {
    const user = await UsersModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error: error.message });
  }
});

// --- HOLDINGS ROUTES ---
app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.status(200).json(allHoldings);
  } catch (error) {
    console.error("Error fetching holdings:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- POSITIONS ROUTES ---
app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.status(200).json(allPositions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- ORDERS ROUTES ---
app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode, product } = req.body;

    if (!name || !qty || !price) {
      return res.status(400).json({ message: "Stock name, quantity, and price are required." });
    }

    // 1. Save new Order
    const newOrder = new OrdersModel({
      name,
      qty: Number(qty),
      price: Number(price),
      mode: mode || "BUY",
      createdAt: new Date(),
    });
    await newOrder.save();

    // 2. Add or update into Positions
    const newPosition = new PositionsModel({
      product: product || "CNC",
      name,
      qty: Number(qty),
      avg: Number(price),
      price: Number(price),
      net: "0.00%",
      day: "0.00%",
      isLoss: false,
    });
    await newPosition.save();

    res.status(201).json({
      message: "Order placed and position added successfully",
      order: newOrder,
      position: newPosition,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- DATABASE SEED HELPER (Initial Data for Empty Database) ---
const seedInitialDataIfEmpty = async () => {
  try {
    const holdingsCount = await HoldingsModel.countDocuments();
    if (holdingsCount === 0) {
      const defaultHoldings = [
        { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
        { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
        { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
        { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%" },
        { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
        { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
        { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%" },
        { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
        { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%" },
        { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
        { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%" },
        { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%" },
        { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
      ];
      await HoldingsModel.insertMany(defaultHoldings);
      console.log("Seeded default holdings into database.");
    }

    const positionsCount = await PositionsModel.countDocuments();
    if (positionsCount === 0) {
      const defaultPositions = [
        { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
        { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
      ];
      await PositionsModel.insertMany(defaultPositions);
      console.log("Seeded default positions into database.");
    }
  } catch (err) {
    console.error("Error checking or seeding data:", err.message);
  }
};

app.post("/seed", async (req, res) => {
  try {
    await seedInitialDataIfEmpty();
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SERVER START & DATABASE CONNECTION ---
const startServer = async () => {
  try {
    if (!MONGO_URL) {
      console.warn("WARNING: MONGO_URL environment variable is not defined in .env!");
    } else {
      await mongoose.connect(MONGO_URL);
      console.log("Successfully connected to MongoDB Atlas.");
      await seedInitialDataIfEmpty();
    }

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server / connect to database:", error);
    // Still listen so health check can respond with status if database fails
    app.listen(PORT, () => {
      console.log(`Server running in fallback mode on port ${PORT}`);
    });
  }
};

startServer();
