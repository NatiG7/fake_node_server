const handleLogout = async () => {
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = 'index.html';
    } catch (err) {
        console.error("Logout failed", err);
    }
}