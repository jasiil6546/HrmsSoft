const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");
const nodemailer = require("nodemailer");
const router = express.Router();

// Mail transporter (removed .env, using direct credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jasiljazz679@gmail.com",   // your Gmail
    pass: "bpyn bndd yhan atwo",      // your App Password
  },
});

// Change Password
router.post("/change-password", (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  if (!userId || !oldPassword || !newPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.query("SELECT * FROM users WHERE id = ?", [userId], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: "Old password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.query("UPDATE users SET password_hash = ? WHERE id = ?", [hashedPassword, userId], (err) => {
      if (err) return res.status(500).json({ error: "Update failed" });
      res.status(200).json({ message: "Password changed successfully" });
    });
  });
});

// Forgot Password (send OTP)
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Email not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = Date.now() + 15 * 60 * 1000; // valid for 15 min

    db.query(
      "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
      [otp, expiry, email],
      (err) => {
        if (err) return res.status(500).json({ error: "Failed to set OTP" });

        transporter.sendMail({
          from: "jasiljazz679@gmail.com",
          to: email,
          subject: "Password Reset OTP",
          text: `Your OTP is: ${otp} (valid for 15 minutes)`,
        });

        res.status(200).json({ message: "OTP sent to email" });
      }
    );
  });
});

// Reset Password with OTP
router.post("/reset-password", (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ? AND reset_token = ? AND reset_token_expiry > ?",
    [email, otp, Date.now()],
    async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 0) return res.status(400).json({ error: "Invalid or expired OTP" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      db.query(
        "UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expiry = NULL WHERE email = ?",
        [hashedPassword, email],
        (err) => {
          if (err) return res.status(500).json({ error: "Password reset failed" });
          res.status(200).json({ message: "Password reset successful" });
        }
      );
    }
  );
});

module.exports = router;
