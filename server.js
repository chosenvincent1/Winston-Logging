import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import bodyParser from 'body-parser';

import cors from "cors";
import logger from "./src/utils/logger.js";
import postRoutes from "./src/routes/post-routes.js";

config();
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json())

app.use("/api/posts", postRoutes);

// Connect to MongoDB
connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(5000, () => logger.info("Server running on port 5000"));
  })
  .catch((error) =>
    logger.fatal("Database connection error: " + error.message)
  );
