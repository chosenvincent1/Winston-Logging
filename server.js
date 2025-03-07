import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import logger from "./src/utils/logger.js";
import postRoutes from "./src/routes/post-routes.js";

config();
const app = express();

// Middleware
app.use(json());
app.use(cors());

// Routes
app.use("/api/posts", postRoutes);

// Connect to MongoDB
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    logger.info("Connected to MongoDB");
    app.listen(5000, () => info("Server running on port 5000"));
  })
  .catch((error) =>
    logger.error("Database connection error: " + error.message)
  );
