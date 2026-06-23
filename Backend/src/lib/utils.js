import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {

    const token = jwt.sign({  userId }, process.env.JWT_SECRET,

         { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // For cross-site requests (frontend and backend on different origins)
        // browsers require SameSite='None' and Secure=true. Use 'none' in
        // production when serving frontend from a different origin.
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    return token;

    
}