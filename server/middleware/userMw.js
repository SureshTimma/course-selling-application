const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");

const  userAuth = async (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1]; 
    // console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    try {
        const decoded = await jwt.verify(token, JWT_USER_SECRET); 
        // console.log(decoded.id);
        req.userId = decoded.id; 
        next(); 
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = {
    userAuth
}