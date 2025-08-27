// routes/attendance.js
const express = require("express");
const db = require("../db");

const router = express.Router();

// ===== Check-in =====
// Insert a check-in record with current timestamp
router.post("/checkin", (req, res) => {
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: "user_id is required" });

  const sql = `
    INSERT INTO user_attendance (user_id, type, timestamp)
    VALUES (?, 1, NOW())
  `;

  db.query(sql, [user_id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage || err.message });

    db.query("SELECT NOW() as now", (e2, r2) => {
      if (e2) return res.status(500).json({ error: e2.sqlMessage || e2.message });
      res.json({ message: "Checked in successfully", checkInTime: r2[0].now });
    });
  });
});

// ===== Check-out =====
// Insert a checkout record and calculate session + total minutes
router.post("/checkout", (req, res) => {
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: "user_id is required" });

  const findCheckin = `
    SELECT timestamp FROM user_attendance
    WHERE user_id = ? AND type = 1 AND DATE(timestamp) = CURDATE()
    ORDER BY timestamp DESC LIMIT 1
  `;

  db.query(findCheckin, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.sqlMessage || err.message });
    if (!rows?.length) return res.status(400).json({ error: "No check-in found for today" });

    const checkinTime = rows[0].timestamp;

    const insertCheckout = `
      INSERT INTO user_attendance (user_id, type, timestamp, duration_minutes)
      VALUES (?, 2, NOW(), TIMESTAMPDIFF(MINUTE, ?, NOW()))
    `;

    db.query(insertCheckout, [user_id, checkinTime], (err2) => {
      if (err2) return res.status(500).json({ error: err2.sqlMessage || err2.message });

      const totalsSql = `
        SELECT
          TIMESTAMPDIFF(MINUTE, ?, NOW()) AS sessionMinutes,
          COALESCE((SELECT SUM(duration_minutes) 
                    FROM user_attendance 
                    WHERE user_id = ? AND type = 2 AND DATE(timestamp) = CURDATE()), 0) 
          AS totalMinutesToday
      `;
      db.query(totalsSql, [checkinTime, user_id], (err3, r3) => {
        if (err3) return res.status(500).json({ error: err3.sqlMessage || err3.message });

        res.json({
          message: "Checked out successfully",
          sessionMinutes: r3[0].sessionMinutes,
          totalMinutesToday: r3[0].totalMinutesToday,
        });
      });
    });
  });
});

// ===== Status =====
// Get today’s attendance status (checked-in/out, last check-in, total minutes)
router.get("/status/:user_id", (req, res) => {
  const { user_id } = req.params;

  const latestSql = `
    SELECT type, timestamp
    FROM user_attendance
    WHERE user_id = ? AND DATE(timestamp) = CURDATE()
    ORDER BY timestamp DESC LIMIT 1
  `;
  const totalSql = `
    SELECT COALESCE(SUM(duration_minutes), 0) AS totalMinutesToday
    FROM user_attendance
    WHERE user_id = ? AND type = 2 AND DATE(timestamp) = CURDATE()
  `;
  const lastInSql = `
    SELECT timestamp AS lastCheckInTime
    FROM user_attendance
    WHERE user_id = ? AND type = 1 AND DATE(timestamp) = CURDATE()
    ORDER BY timestamp DESC LIMIT 1
  `;

  db.query(totalSql, [user_id], (e1, totalRows) => {
    if (e1) return res.status(500).json({ error: e1.sqlMessage || e1.message });
    const totalMinutesToday = totalRows[0]?.totalMinutesToday || 0;

    db.query(latestSql, [user_id], (e2, latestRows) => {
      if (e2) return res.status(500).json({ error: e2.sqlMessage || e2.message });
      const latest = latestRows[0];

      if (latest && latest.type === 1) {
        db.query(lastInSql, [user_id], (e3, inRows) => {
          if (e3) return res.status(500).json({ error: e3.sqlMessage || e3.message });
          res.json({
            checkedIn: true,
            lastCheckInTime: inRows[0]?.lastCheckInTime || latest.timestamp,
            totalMinutesToday,
          });
        });
      } else {
        res.json({
          checkedIn: false,
          lastCheckInTime: null,
          totalMinutesToday,
        });
      }
    });
  });
});

module.exports = router;


