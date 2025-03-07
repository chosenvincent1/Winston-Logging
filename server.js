import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import bodyParser from 'body-parser';


import cors from "cors";
import logger from "./src/utils/logger.js";
import postRoutes from "./src/routes/post-routes.js";

config();
const app = express();

// Middleware
// app.use(json());
app.use(bodyParser.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Routes
app.use("/api/posts", postRoutes);

// Connect to MongoDB
connect(process.env.MONGO_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
    app.listen(5000, () => logger.info("Server running on port 5000"));
  })
  .catch((error) =>
    logger.fatal("Database connection error: " + error.message)
  );
