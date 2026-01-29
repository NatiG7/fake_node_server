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
    catch (ex) {
        console.error("Get alerts error : ", ex);
        res.status(500).json({ message: "Internal server error" });
    }
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
    if (!threat_type || threat_type.trim() === '') {
        return res.status(400).json({ message: "Threat type cannot be empty" });
    }
    if (isNaN(risk_score) || risk_score < 0 || risk_score > 10) {
        return res.status(400).json({ message: "Risk score must be a number between 0-10" });
    }

    const insertQuery = "INSERT INTO mock_alerts (threat_type, source_ip, risk_score, status) VALUES (?, ?, ?, ?)";
    try {
        const [result] = await pool.query(insertQuery, [threat_type, source_ip, risk_score, status || 'New']);
        res.status(201).json({ message: "Alert added", id: result.insertId });
    } catch (ex) {
        console.error("Add Alert Error:", ex);
        res.status(500).json({ message: "Internal Server Error" });
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
        console.error("Delete Alert Error:", ex);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getAllAlerts, addAlert, deleteAlert };