const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

const  adminAuth = (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    try {
        const decoded = jwt.verify(token, JWT_ADMIN_SECRET); 
        req.userId = decoded.id; 
        next(); 
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = {
    adminAuth
}