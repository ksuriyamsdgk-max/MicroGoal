const express = require("express");
const router = express.Router();

const Goal = require("../Model/GoalModel");
const authMiddleware = require("../Middlewares/authMiddleware");


// create goal
router.post("/goals", authMiddleware, async (req, res, next) => {

try {

const { title } = req.body;

const goal = await Goal.create({
title,
user: req.user
});

res.status(201).json(goal);

} catch (err) {
next(err);
}

});


// get goals
router.get("/goals", authMiddleware, async (req, res, next) => {

try {

const goals = await Goal.find({ user: req.user });

res.json(goals);

} catch (err) {
next(err);
}

});

module.exports = router;