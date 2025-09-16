const express = require("express");
const router = express.Router();
const connection = require("../db"); 

router.get("/", (req, res) => {
    connection.query("SELECT * FROM goals", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});


router.get("/:id", (req, res) => {
    connection.query("SELECT * FROM goals WHERE goalId = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: "Goal not found" });
        res.json(results[0]);
    });
});


router.post("/", (req, res) => {
    const { goalName, description, startDate, endDate, estimatedHours, createdBy, assignedTo } = req.body;
    const sql = "INSERT INTO goals (goalName, description, startDate, endDate, estimatedHours, status, createdBy, assignedTo) VALUES (?, ?, ?, ?, ?, 1, ?, ?)";
    connection.query(sql, [goalName, description, startDate, endDate, estimatedHours, createdBy, assignedTo], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Goal created", goalId: result.insertId });
    });
});


router.put("/:id", (req, res) => {
    const { goalName, description, startDate, endDate, estimatedHours } = req.body;
    connection.query("SELECT * FROM goals WHERE goalId = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: "Goal not found" });
        const goal = results[0];
        if (goal.status !== 1) return res.status(400).json({ message: "Can only update Pending goals" });

        const sql = "UPDATE goals SET goalName=?, description=?, startDate=?, endDate=?, estimatedHours=? WHERE goalId=?";
        connection.query(sql, [goalName, description, startDate, endDate, estimatedHours, req.params.id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Goal updated" });
        });
    });
});


router.delete("/:id", (req, res) => {
    connection.query("DELETE FROM goals WHERE goalId = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Goal not found" });
        res.json({ message: "Goal deleted successfully" });
    });
});


router.put("/:id/status", (req, res) => {
    const { newStatus } = req.body; 
    const validTransitions = {
        1: [2, 3], 
        2: [4],   
        4: [5]     
    };

    connection.query("SELECT status FROM goals WHERE goalId=?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (!results.length) return res.status(404).json({ message: "Goal not found" });

        const currentStatus = results[0].status;
        if (!validTransitions[currentStatus]?.includes(newStatus))
            return res.status(400).json({ message: "Invalid status transition" });

        connection.query("UPDATE goals SET status=? WHERE goalId=?", [newStatus, req.params.id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Status updated" });
        });
    });
});


router.put("/:id/complete", (req, res) => {
    const { rating, feedback } = req.body;
    connection.query("SELECT status FROM goals WHERE goalId=?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (!results.length) return res.status(404).json({ message: "Goal not found" });
        if (results[0].status !== 5) return res.status(400).json({ message: "Goal must be Completed first" });

        connection.query("UPDATE goals SET rating=?, feedback=? WHERE goalId=?", [rating, feedback, req.params.id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Goal completed with feedback" });
        });
    });
});

module.exports = router;
