// Nati G.

/**
 * Middleware: pageGuard
 * Description: Prevents direct access to HTML pages (Home/Manage) if the user is not logged in.
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