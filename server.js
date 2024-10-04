import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./config/db.js";
import requestLogger from "./middleware/requestLogger.js";
import errorHandler from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import stickersRoutes from "./routes/stickersRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import questionRouts from "./routes/questionRouts.js";
import userBoardRoute from "./routes/userBoardRoute.js";
import userQuestionRoute from "./routes/userQuestionRoute.js";
import authRoutes from './routes/authRoutes.js'; 

// constants
//const PORT = process.env.PORT || 8080;
const PORT = 8080;
// initialising app instance
const app = express();

// middlewares
app.use(cors());
// middleware that handles json
app.use(express.json());

// request logging middleware
app.use(requestLogger);

//! root request ** only used for testing ** // to be deleted
app.get("/", (req, res) => {
  res.send("hello , THIS IS NEW SKITICK - with Zaid and Anas and Hadeel ");
});

// routes
app.use("/api/auth", authRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/stickers", stickersRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/questions", questionRouts);
app.use("/api/userboard", userBoardRoute);
app.use("/api/userquestion", userQuestionRoute);

// error handling middlware
app.use(errorHandler);

// database connection and app listener
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Skitick app listening on port ${PORT}`);
  });
});
