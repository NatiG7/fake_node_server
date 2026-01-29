// Nati G.

/**
 * Middleware: isAuthenticated
 * Description: Protects routes by checking if a valid user session exists.
 * Requirement: Authorization check before data access.
 */
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    return res.status(401).json({ message: "Unauthorized. Please login." });
};

module.exports = isAuthenticated;