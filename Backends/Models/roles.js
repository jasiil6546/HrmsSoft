// routes/roles.js
const express = require("express");
const db = require("../db");

const router = express.Router();

// GET all roles (not deleted)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM roles WHERE deletedTimestamp IS NULL");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({ message: err.message });
  }
});

// ADD a role
router.post("/", async (req, res) => {
  try {
    const { role_name, description } = req.body;
    const [result] = await db.query(
      "INSERT INTO roles (role_name, description) VALUES (?, ?)",
      [role_name, description]
    );
    const [newRole] = await db.query("SELECT * FROM roles WHERE id = ?", [result.insertId]);
    res.status(201).json(newRole[0]);
  } catch (err) {
    console.error("Error adding role:", err);
    res.status(400).json({ message: err.message });
  }
});

// EDIT a role
router.put("/:id", async (req, res) => {
  try {
    const { role_name, description } = req.body;
    await db.query(
      "UPDATE roles SET role_name = ?, description = ? WHERE id = ?",
      [role_name, description, req.params.id]
    );
    const [updated] = await db.query("SELECT * FROM roles WHERE id = ?", [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(400).json({ message: err.message });
  }
});

// SOFT DELETE a role
router.patch("/:id/soft-delete", async (req, res) => {
  try {
    const { userWhoDeleted } = req.body;
    const deletedTimestamp = new Date();
    await db.query(
      "UPDATE roles SET deletedTimestamp = ?, userWhoDeleted = ? WHERE id = ?",
      [deletedTimestamp, userWhoDeleted, req.params.id]
    );
    res.json({ id: req.params.id }); // send ID back for frontend removal
  } catch (err) {
    console.error("Error soft deleting role:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;


