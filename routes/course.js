const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const courseController = require("../controllers/CourseController");

router.get("/", authMiddleware.verifyToken, courseController.getList);

module.exports = router;
