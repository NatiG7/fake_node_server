// Nati G.

// Script seeds users with hashes to db for demo.
const db = require('../db/dbSingleton');
const bcrypt = require('bcrypt');
const pool = db.getConnection();

const usersToSeed = [
    { username: 'admin', password: 'admin123', full_name: 'System Admin', role: 'admin' },
    { username: 'david', password: '123456', full_name: 'David Cohen', role: 'analyst' },
    { username: 'sarah', password: 'pass789', full_name: 'Sarah Levy', role: 'viewer' },
    { username: 'yossi', password: 'qwerty', full_name: 'Yossi Ben', role: 'analyst' },
    { username: 'student', password: 'pass123', full_name: 'Demo Student', role: 'user' },
    { username: 'teacher', password: 'teach1', full_name: 'Code Teacher', role: 'admin' }
];

const seedDatabase = async () => {
    try {
        await pool.query("DELETE FROM users");
        await pool.query("ALTER TABLE users AUTO_INCREMENT = 1");
        console.log("Users table cleared.");
        console.log("Hashing passwords and inserting records...");
        
        for (const user of usersToSeed) {
            const hashedPwd = await bcrypt.hash(user.password, 10);
            const insertQuery = `
                INSERT INTO users (username, password, full_name, role) 
                VALUES (?, ?, ?, ?)
            `;
            await pool.query(insertQuery, [
                user.username, 
                hashedPwd, 
                user.full_name, 
                user.role
            ]);
            console.log(`Created user: ${user.username}`);
        }

        console.log("Seeding Complete. Database is ready for login.");
        process.exit(0);

    } catch (err) {
        console.error("Seeding Failed:", err);
        process.exit(1);
    }
};
seedDatabase();