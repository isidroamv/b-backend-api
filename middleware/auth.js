
// Fake JWT middleware
const fakeJwtMiddleware = (req, res, next) => {
    // Simulate a fake JWT token in the Authorization header
    const token = req.headers['authorization'];

    // Check if the token is provided
    if (token && token.startsWith('Bearer ')) {
        // Extract the token (fake validation)
        const jwtToken = token.split(' ')[1];

        req.user = {
            id: '12345',
            username: 'testuser',
            role: 'user'
        };
        next();
    } else {
        // If no token is provided, respond with an unauthorized status
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
};

module.exports = fakeJwtMiddleware;
