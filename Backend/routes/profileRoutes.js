const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const { saveProfile } = require("../controllers/profileController");

router.post("/profile", authenticateToken, saveProfile);

module.exports = router;
