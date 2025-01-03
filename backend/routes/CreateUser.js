const express = require('express');
const routers = express.Router();
const { body, validationResult } = require('express-validator');
const user = require('../models/user');
const auth=require("../middleware/auth.js")
const jwt = require('jsonwebtoken');

// Middleware to authenticate token
// Create User
routers.post("/createuser",
    [
        body('name').isLength({ min: 5 }),
        body('email').isEmail(),
        body('password').isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await user.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                mobileno: req.body.mobileno,
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
);

// Login User
routers.post("/loginuser",
    [
        body('email').isEmail(),
        body('password').isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email } = req.body;
            let userData = await user.findOne({ email });
            if (!userData || req.body.password !== userData.password) {
                return res.status(400).json({ errors: "Invalid credentials" });
            }

            const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ success: true, token });
        } catch (error) {
            console.error("Error during login:", error);
            res.json({ success: false });
        }
    }
);
// Get User Info
// Get User Info (for fetching the username)
routers.get("/user", auth, async (req, res) => {
    try {
        // Fetch the user by the ID from the decoded token
        const userData = await user.findById(req.user.id); // Use the `id` from the token payload
        if (userData) {
            res.json({ name: userData.name,cartValue:userData.shopping_cart.length }); // Return the user's name and cart size
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = routers;
