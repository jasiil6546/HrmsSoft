const express = require("express");
const router = express.Router();
const db = require("../db"); 

// ✅ CREATE (Add holiday)
router.post("/", (req, res) => {
  const { holidayName, date, description } = req.body;
  const sql = "INSERT INTO holidays (holidayName, date, description) VALUES (?, ?, ?)";
  db.query(sql, [holidayName, date, description], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, holidayName, date, description });
  });
});

// ✅ READ (Get active holidays)
router.get("/", (req, res) => {
  const sql = "SELECT * FROM holidays WHERE deletedAt IS NULL ORDER BY date ASC";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// ✅ READ ALL (including deleted)
router.get("/all", (req, res) => {
  const sql = "SELECT * FROM holidays ORDER BY date ASC";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// ✅ UPDATE (Edit holiday)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { holidayName, date, description } = req.body;
  const sql = "UPDATE holidays SET holidayName=?, date=?, description=? WHERE id=?";
  db.query(sql, [holidayName, date, description, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Holiday updated" });
  });
});

// ✅ SOFT DELETE (mark as deleted with timestamp)
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE holidays SET deletedAt = NOW() WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Holiday soft-deleted" });
  });
});

// ✅ RESTORE (undo delete, set deletedAt back to NULL)
router.put("/restore/:id", (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE holidays SET deletedAt = NULL WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Holiday restored" });
  });
});

module.exports = router;
