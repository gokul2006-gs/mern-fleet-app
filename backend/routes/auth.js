const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: "1h"
    });
};

router.post("/register", async (req, res) => {
    console.log("REGISTER HIT");
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashed });
        await user.save();

        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, email: user.email } });

    } catch (err) {
        console.error("❌ REGISTER FAILED:", err);
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        if (!user.password) {
            return res.status(400).json({ msg: "Please login with Google" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = generateToken(user.id);
        res.json({ token, user: { id: user.id, email: user.email } });

    } catch (err) {
        console.error("❌ LOGIN FAILED:", err);
        res.status(500).json({ error: err.message });
    }
});

router.post("/google", async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const { email, name, picture, sub } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            // Create new user for Google login
            user = new User({ email, name, picture });
            await user.save();
        } else {
            // Update existing user with latest Google info
            user.name = name;
            user.picture = picture;
            await user.save();
        }

        const jwtToken = generateToken(user.id);
        res.json({ token: jwtToken, user: { id: user.id, email: user.email } });

    } catch (err) {
        console.error("❌ GOOGLE LOGIN FAILED:", err);
        res.status(500).json({ msg: "Google login failed" });
    }
});

module.exports = router;
