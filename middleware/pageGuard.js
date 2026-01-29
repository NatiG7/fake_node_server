// Nati G.

/**
 * Middleware: pageGuard
 * Description: Prevents direct access to HTML pages (Home/Manage) if the user is not logged in.
 * Note: This must run AFTER session middleware but BEFORE static files.
 */
const pageGuard = (req, res, next) => {
    const protectedPages = ['/home.html', '/manage.html'];
    if (protectedPages.includes(req.path)) {
        if (!req.session || !req.session.user) {
            return res.redirect('/index.html');
        }
    }
    next();
};

module.exports = pageGuard;