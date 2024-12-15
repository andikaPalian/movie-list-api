const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.Authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
                if (err) {
                    return res.status(403).json({message: "User is not authorized"});
                };
                req.user = decoded.user || {id: decoded.id};
                next();
            });
        } else {
            return res.status(401).json({message: "Token is missing or not provide"});
        };
    } catch (error) {
        console.error("Error in validateToken middleware:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

module.exports = validateToken;