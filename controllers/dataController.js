// Nati G.

const db = require('../db/dbSingleton');
const pool = db.getConnection();

/**
 * Function: getAllAlerts
 * Description: Retrieves all alerts from the database, sorted by ID.
 * Requirement: Send list of data to FE[cite: 85].
 */
const getAllAlerts = async (req, res) => {
    try {
        const selectAllAlertsQuery = "SELECT * FROM mock_alerts ORDER BY id DESC";
        const [result] = await pool.query(selectAllAlertsQuery);
        if (result.length === 0) return res.status(200).json([]);
        res.status(200).json(result);
    }
    catch (ex) { res.status(500).json({ error: ex.message }); }
}

/**
 * Function: addAlert
 * Description: Inserts a new alert into the database.
 * [cite_start]Requirement: Receive new record from FE and update DB[cite: 86].
 */
const addAlert = async (req, res) => {
    const { threat_type, source_ip, risk_score, status } = req.body;

    // Validate inputs
    if (!threat_type || !source_ip || !risk_score) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const insertQuery = "INSERT INTO mock_alerts (threat_type, source_ip, risk_score, status) VALUES (?, ?, ?, ?)";
    try {
        const [result] = await pool.query(insertQuery, [threat_type, source_ip, risk_score, status || 'New']);
        // Send back the ID so we can use it in the Frontend immediately
        res.status(201).json({ message: "Alert added", id: result.insertId });
    } catch (ex) {
        res.status(500).json({ error: ex.message });
    }
};

/**
 * Function: deleteAlert
 * Description: Deletes an alert by ID.
 * [cite_start]Requirement: Receive delete request and update DB[cite: 87].
 */
const deleteAlert = async (req, res) => {
    const { id } = req.params;
    const deleteQuery = "DELETE FROM mock_alerts WHERE id = ?";
    try {
        const [result] = await pool.query(deleteQuery, [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Alert not found" });
        res.status(200).json({ message: "Alert deleted successfully" });
    } catch (ex) {
        res.status(500).json({ error: ex.message });
    }
};

module.exports = { getAllAlerts, addAlert, deleteAlert };