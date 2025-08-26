// routes/attendance.js
const express = require("express");
const router = express.Router();
const db = require("../db"); 

// ----------------- Fetch Today's Attendance -----------------
app.get("/status", (req, res) => {
  const { email, date } = req.query;

  const sql = "SELECT * FROM attendance WHERE user_email = ? AND date = ?";
  db.query(sql, [email, date], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.json({});
    res.json(result[0]);
  });
});

// ----------------- Check-In -----------------
app.post("/checkin", (req, res) => {
  const { email } = req.body;
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  // Check if already checked in today
  const sqlCheck = "SELECT * FROM attendance WHERE user_email = ? AND date = ?";
  db.query(sqlCheck, [email, today], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length > 0) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    // Insert new record
    const sqlInsert = "INSERT INTO attendance (user_email, check_in_time, date) VALUES (?, ?, ?)";
    db.query(sqlInsert, [email, now, today], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({ message: "Checked in successfully", checkInTime: now });
    });
  });
});

// ----------------- Check-Out -----------------
app.post("/checkout", (req, res) => {
  const { email } = req.body;
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  const sql = "SELECT * FROM attendance WHERE user_email = ? AND date = ?";
  db.query(sql, [email, today], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(400).json({ message: "No check-in found today" });

    const attendance = result[0];
    if (attendance.check_out_time) return res.status(400).json({ message: "Already checked out today" });

    // Calculate worked hours in seconds
    const workedSeconds = (now - attendance.check_in_time) / 1000;
    const updateSql = "UPDATE attendance SET check_out_time = ?, worked_hours = SEC_TO_TIME(?) WHERE id = ?";
    db.query(updateSql, [now, workedSeconds, attendance.id], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({ message: "Checked out successfully", checkOutTime: now });
    });
  });
});


module.exports = router;
