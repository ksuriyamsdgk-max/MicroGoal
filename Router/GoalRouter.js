import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Goal from "../models/Goal.js";

const router = express.Router();

// CREATE GOAL ROUTE
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;

    const goal = await Goal.create({
      title,
      completed: false,
      user: req.user.id
    });

    res.status(200).json({
      success: true,
      data: goal
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

export default router;