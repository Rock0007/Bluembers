const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();
const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

// JSON Data
app.use(express.json());

// Cross-Origin
const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// Firebase Admin Initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// API Endpoints
app.get("/", (req, res) => {
  return res.send("Hello");
});

const userRoute = require("./routes/User.js");
app.use("/api/users", userRoute);

const productRoute = require("./routes/products");
app.use("/api/products/", productRoute);
// Export Cloud Function
exports.app = functions.https.onRequest(app);
