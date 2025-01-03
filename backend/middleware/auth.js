const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Authorization: Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token with the secret
        //console.log("Decoded user:", verified);
        req.user = verified;  // Attach the decoded user info to the request object
        next();  // Continue to the next middleware/route handler
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: "Invalid Token" });
    }
};

module.exports = auth;
