import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./config/db.js";
import requestLogger from "./middleware/requestLogger.js";
import errorHandler from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import stickersRoutes from "./routes/stickersRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";

// constants
const PORT = process.env.PORT || 3000;
// initialising app instance
const app = express();

// middlewares
app.use(cors());
// middleware that handles json 
app.use(express.json())

// request logging middleware
app.use(requestLogger);

//! root request ** only used for testing ** // to be deleted 
app.get("/", (req, res) => {
  res.send("hello");
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/stickers", stickersRoutes);
app.use("/api/boards", boardRoutes);

// error handling middlware
app.use(errorHandler);

// database connection and app listener
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Skitick app listening on port ${PORT}`);
  });
});
