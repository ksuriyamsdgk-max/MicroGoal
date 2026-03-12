import express from "express";
import goalRouter from "./routes/GoalRouter.js";

const app = express();

app.use(express.json());

app.use("/", goalRouter);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});