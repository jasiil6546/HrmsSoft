const express = require("express");
const router = express.Router();
const db = require("../db");

// Create a new holiday
router.post("/", (req, res) => {
  const { holidayName, date, description } = req.body;
  const sql = "INSERT INTO holidays (holidayName, date, description) VALUES (?, ?, ?)";
  db.query(sql, [holidayName, date, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    // Return the inserted record with date as ISO string for consistency
    res.json({
      id: result.insertId,
      holidayName,
      date,
      description,
    });
  });
});

// Get all non-deleted holidays, ordered by date asc
router.get("/", (req, res) => {
  const sql = "SELECT * FROM holidays WHERE deletedAt IS NULL ORDER BY date ASC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Update a holiday by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { holidayName, date, description } = req.body;
  const sql = "UPDATE holidays SET holidayName=?, date=?, description=? WHERE id=?";
  db.query(sql, [holidayName, date, description, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Holiday updated" });
  });
});

// Soft delete a holiday by ID (sets deletedAt timestamp)
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE holidays SET deletedAt = NOW() WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Holiday soft-deleted" });
  });
});

module.exports = router;
