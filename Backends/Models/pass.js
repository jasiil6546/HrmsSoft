// Models/pass.js
const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../db");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, "your_secret_key"); // same secret as login
    req.user = decoded; // contains id and role_id
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// POST /pass/change-password
router.post("/change-password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both old and new passwords are required" });
  }

  try {
    // 1️⃣ Get current password_hash
    connection.query("SELECT password_hash FROM users WHERE id = ?", [userId], async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (results.length === 0) return res.status(404).json({ message: "User not found" });

      const user = results[0];

      // 2️⃣ Compare old password
      const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
      if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

      // 3️⃣ Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // 4️⃣ Update in DB
      connection.query("UPDATE users SET password_hash = ? WHERE id = ?", [hashedPassword, userId], (err, result) => {
        if (err) return res.status(500).json({ message: "Failed to update password" });
        res.json({ message: "Password changed successfully" });
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

