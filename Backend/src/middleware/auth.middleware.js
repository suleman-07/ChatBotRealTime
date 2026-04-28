import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next ) => {
    
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message : "Unauthorizes access" });

    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();

    } catch (error) {
         res.status(401).json({ message : "Invalid token" });
         console.log("Error in protectedRoute middleware", error);

}
};