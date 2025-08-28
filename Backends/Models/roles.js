const express = require("express");
const db = require("../db"); // db should be mysql2 without /promise
const router = express.Router();

// GET all roles (not deleted)
router.get("/", (req, res) => {
  db.query("SELECT * FROM roles WHERE deletedTimestamp IS NULL", (err, rows) => {
    if (err) {
      console.error("Error fetching roles:", err);
      return res.status(500).json({ message: err.message });
    }
    res.json(rows);
  });
});

// ADD a role
router.post("/", (req, res) => {
  const { role_name, description } = req.body;
  db.query(
    "INSERT INTO roles (role_name, description) VALUES (?, ?)",
    [role_name, description],
    (err, result) => {
      if (err) {
        console.error("Error adding role:", err);
        return res.status(400).json({ message: err.message });
      }

      db.query("SELECT * FROM roles WHERE id = ?", [result.insertId], (err2, rows) => {
        if (err2) {
          console.error("Error fetching new role:", err2);
          return res.status(400).json({ message: err2.message });
        }
        res.status(201).json(rows[0]);
      });
    }
  );
});

// EDIT a role
router.put("/:id", (req, res) => {
  const { role_name, description } = req.body;
  db.query(
    "UPDATE roles SET role_name = ?, description = ? WHERE id = ?",
    [role_name, description, req.params.id],
    (err) => {
      if (err) {
        console.error("Error updating role:", err);
        return res.status(400).json({ message: err.message });
      }

      db.query("SELECT * FROM roles WHERE id = ?", [req.params.id], (err2, rows) => {
        if (err2) {
          console.error("Error fetching updated role:", err2);
          return res.status(400).json({ message: err2.message });
        }
        res.json(rows[0]);
      });
    }
  );
});

// SOFT DELETE a role
router.patch("/:id/soft-delete", (req, res) => {
  const { userWhoDeleted } = req.body;
  const deletedTimestamp = new Date();
  db.query(
    "UPDATE roles SET deletedTimestamp = ?, userWhoDeleted = ? WHERE id = ?",
    [deletedTimestamp, userWhoDeleted, req.params.id],
    (err) => {
      if (err) {
        console.error("Error soft deleting role:", err);
        return res.status(400).json({ message: err.message });
      }
      res.json({ id: req.params.id }); // send ID back for frontend removal
    }
  );
});

module.exports = router;



