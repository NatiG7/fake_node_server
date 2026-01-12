const db = require('../db/dbSingleton');
const pool = db.getConnection();

const getAllAlerts = async (req, res) => {
    try {
        const selectAllAlertsQuery = "SELECT * FROM mock_alerts ORDER BY id DESC";
        const [result] = await pool.query(selectAllAlertsQuery);
        if (result.length === 0) return res.status(200).json([]);
        res.status(200).json(result);
    }
    catch (ex) { res.status(500).json({ error: ex.message }); }
}

module.exports = { getAllAlerts };