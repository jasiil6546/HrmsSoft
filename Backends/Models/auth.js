const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");




///Register

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if email exists
        connection.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (results.length > 0) {
                return res.status(400).json({ error: "Email already registered" });
            }

            // Count users
            connection.query("SELECT COUNT(*) AS count FROM users", async (err, countResult) => {
                if (err) return res.status(500).json({ error: "Database error" });

                const isFirstUser = countResult[0].count === 0;

                const hashedPassword = await bcrypt.hash(password, 10);

                // First user → Admin (role_id = 1), else User (role_id = 2)
                const role_id = isFirstUser ? 1 : 4;

                connection.query(
                    "INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, ?)",
                    [name, email, hashedPassword, role_id],
                    (err, result) => {
                        if (err) return res.status(500).json({ error: "Insert failed" });

                        res.status(201).json({
                            message: isFirstUser
                                ? "First user registered as Admin"
                                : "User registered successfully",
                            userId: result.insertId,
                            role_id,
                        });
                    }
                );
            });
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
/////////////////////////////////////
// 🔑 Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        connection.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (results.length === 0) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const user = results[0];

            // ✅ Use password_hash instead of password
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            // ✅ Generate JWT token
            const token = jwt.sign(
                { id: user.id, role_id: user.role_id },
                "your_secret_key", // change this to env var
                { expiresIn: "1h" }
            );

            res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role_id: user.role_id
                }
            });
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;