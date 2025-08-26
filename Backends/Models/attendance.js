const express = require("express");
const router = express.Router();
const db = require("../db");

// ===== Check-in =====
router.post("/checkin", (req, res) => {
  const { user_id } = req.body;

  if (!user_id) return res.status(400).json({ error: "user_id is required" });

  const sql = `
    INSERT INTO user_attendance (user_id, type, duration_minutes)
    VALUES (?, 1, NULL)
  `;
  db.query(sql, [user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Checked in successfully", checkin_id: result.insertId });
  });
});

// ===== Check-out =====
router.post("/checkout", (req, res) => {
  const { user_id } = req.body;

  if (!user_id) return res.status(400).json({ error: "user_id is required" });

  // Find last check-in for this user
  const findCheckin = `
    SELECT * FROM user_attendance
    WHERE user_id = ? AND type = 1
    ORDER BY timestamp DESC
    LIMIT 1
  `;

  db.query(findCheckin, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0)
      return res.status(400).json({ error: "No check-in found for this user" });

    const checkinTime = rows[0].timestamp;

    // Insert checkout with duration in minutes
    const insertCheckout = `
      INSERT INTO user_attendance (user_id, type, duration_minutes)
      VALUES (?, 2, TIMESTAMPDIFF(MINUTE, ?, NOW()))
    `;

    db.query(insertCheckout, [user_id, checkinTime], (err2, result) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({ message: "Checked out successfully" });
    });
  });
});

// ===== Optional: Get all attendance for a user =====
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;
  const sql = `
    SELECT * FROM user_attendance
    WHERE user_id = ?
    ORDER BY timestamp DESC
  `;
  db.query(sql, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

module.exports = router;

