const express = require("express");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Task Routes
router.route("/")
    .get(authMiddleware, getTasks)  // Get all tasks (protected)
    .post(authMiddleware, createTask);  // Create a new task (protected)

router.route("/:id")
    .put(authMiddleware, updateTask)  // Update task (protected)
    .delete(authMiddleware, deleteTask);  // Delete task (protected)

module.exports = router;
