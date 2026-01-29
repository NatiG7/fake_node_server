const db = require('../db/dbSingleton');
const pool = db.getConnection();

/**
 * Function: logEvent
 * Description: Inserts a new log entry into the system_logs table.
 */
const logEvent = async (type, message) => {
    try {
        const query = "INSERT INTO system_logs (event_type, message) VALUES (?, ?)";
        pool.query(query, [type, message]); 
    } catch (err) {
        console.error("Logging failed:", err);
    }
};

/**
 * Middleware: requestLogger
 * Description: Logs incoming requests to Console (always) and DB (selective).
 */
const requestLogger = (req, res, next) => {
    if (!req.url.startsWith('/css') && !req.url.startsWith('/js'))
        console.log(`[WEB] ${req.method} ${req.url} from ${req.ip}`);
    
    if (!req.url.startsWith('/css') && !req.url.startsWith('/js') && req.method !== 'GET') {
        const userId = req.session?.user?.id || 'Guest';
        logEvent('TRAFFIC', `Method: ${req.method}, URL: ${req.url}, UserID: ${userId}`);
    }

    next();
};

module.exports = { logEvent, requestLogger };