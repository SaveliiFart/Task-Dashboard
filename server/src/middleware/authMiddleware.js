import jwt from "jsonwebtoken"

const SECRET = "SECRET_KEY"

export const authMiddleware = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) return res.status(401).json({ message: "No token"})

    try{
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;

        next()
    } catch {
        res.status(401).json({message: "Invalid token"})
    }
}