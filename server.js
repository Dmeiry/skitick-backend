import express from "express";
import cors from "cors";
import requestLogger from "./middleware/requestLogger.js";
import errorHandler from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv/config";

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

// error handling middlware
app.use(errorHandler);

// database connection and app listener
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Skitick app listening on port ${PORT}`);
  });
});