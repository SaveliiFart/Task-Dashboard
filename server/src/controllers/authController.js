import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { db } from "../config/db.js"

const SECRET = "SECRET_KEY"

export const register = async (req, res) => {
    const { email, password } = req.body;

    const existing = await db.get(
        "SELECT * FROM users WHERE email = ?", [email]
    )

    if (existing) {
        return res.status(400).json({ message: "Users exists" })
    }

    const hashed = await bcrypt.hash(password, 10)

    await db.run(
        "INSERT INTO users (email,password) VALUES (?,?)",
        [email, hashed]
    )

    res.json({ message: "Registered" })
}

export const login = async (req, res) => {
    const { email, password } = req.body

    const user = await db.get(
        "SELECT * FROM users WHERE email=?",
        [email]
    )

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" })
    }

    const token = jwt.sign(
        { id: user.id },
        SECRET,
        { expiresIn: "1h" }
    )

    res.json({ token })
}

export const getProfile = async (req, res) => {
    const userId = req.user.id;

    const user = await db.get(
        "SELECT id, email, name FROM users WHERE id = ?",
        [userId]
    );

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
};

export const updateProfile = async (req, res) => {
    const { name } = req.body

    await db.run(
        "UPDATE users SET name = ? WHERE id = ?",
        [name || "User", req.user.id]
    )

    const updatedUser = await db.get(
        "SELECT id, email, name FROM users WHERE id = ?",
        [req.user.id]
    )

    res.json(updatedUser)
}