import express from "express";
import cors from "cors";
import requestLogger from "./middleware/requestLogger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// request logging
app.use(requestLogger);
// root request
app.get("/", (req, res) => {
  res.send("hello");
});

// error handler
app.use(errorHandler);

// server listener
app.listen(PORT, () => {
  console.log(`Skitick app listening on port ${PORT}`);
});
