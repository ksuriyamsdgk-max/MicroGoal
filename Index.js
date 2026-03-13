require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const AuthRouter = require("./Router/AuthRouter");

const app = express();
app.use(express.json());

// CONNECT ROUTER
app.use("/auth", AuthRouter);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("MongoDB Connected");
})
.catch(err => {
  console.log(err);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});