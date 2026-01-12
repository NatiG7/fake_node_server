const bcrypt = require('bcrypt');
const db = require('../db/dbSingleton');
const pool = db.getConnection();

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
        res.status(500).json({ error: ex.message });
    }
};
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send("Bad Input Please verify fields.");
    const selectThisUserQuery = "SELECT * FROM users WHERE username = ?";
    const [thisUser] = await pool.query(selectThisUserQuery, [username]);
    if (thisUser.length === 0) return res.status(404).json({ message: "Error on auth" })
    if (await bcrypt.compare(password, thisUser[0].password)) {
        res.status(200).json({ 
            message: "Login success",
            userId: thisUser[0].id,
            username: thisUser[0].username
         });
    }
};

const authController = { register, login };
module.exports = authController;