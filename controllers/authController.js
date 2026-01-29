// Nati G.

const bcrypt = require('bcrypt');
const db = require('../db/dbSingleton');
const pool = db.getConnection();

/**
 * Function: register
 * Description: Receives new user data, hashes password, and inserts into DB.
 * Requirement: Check if user exists (handled by DB constraint), Insert to DB[cite: 83, 84].
 */
const register = async (req, res) => {
    const { username, password, full_name } = req.body;

    if (!username || !password || !full_name) {
        return res.status(400).send("Bad Input Please verify fields.");
    }

    const insertNewUserQuery = "INSERT INTO users (username, password, full_name) VALUES(?,?,?)";

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const [result] = await pool.query(insertNewUserQuery, [username, hashedPwd, full_name]);

        res.status(201).json({
            message: "Registration success",
            userId: result.insertId
        });
    }
    catch (ex) {
        if (ex.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "User already exists" });
        }
        res.status(500).json({ error: ex.message });
    }
};

/**
 * Function: login
 * Description: Authenticates a user by comparing hashed passwords.
 * Requirement: Check username/password in DB, return success/error[cite: 76, 77].
 */
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send("Bad Input Please verify fields.");
    try {
        const selectThisUserQuery = "SELECT * FROM users WHERE username = ?";
        const [thisUser] = await pool.query(selectThisUserQuery, [username]);
        if (thisUser.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, thisUser[0].password);

        if (isMatch) {
            req.session.user = {
                id: thisUser[0].id,
                username: thisUser[0].username,
                role: thisUser[0].role
            }
            res.status(200).json({
                message: "Login success",
                userId: thisUser[0].id,
                username: thisUser[0].username
            });
        } else {
            res.status(401).json({ message: "Incorrect password" });
        }
    } catch (ex) {
        res.status(500).json({ error: ex.message });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "Could not log out" });
        res.clearCookie('connect.sid');
        res.status(200).json({ message: "Logout successful" });
    })
}

const authController = { register, login, logout };
module.exports = authController;