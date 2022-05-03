const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (token == null) return res.status(401).json({
        msg: "TOKEN IS UNDEFINED"
    });

    jwt.verify(token, process.env.DB_SECRET, (err, user) => {
        console.log("TOKEN CONFIRM ERR", err);
        if (err) return res.status(403).json({
            msg: "TOKEN IS EXPIRED"
        });
        next();
    });
};

module.exports = { authenticateToken };
