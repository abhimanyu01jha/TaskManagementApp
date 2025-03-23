import jwt from 'jsonwebtoken';

const authMiddleware = (req,res,next)=>{
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

}

export default authMiddleware;