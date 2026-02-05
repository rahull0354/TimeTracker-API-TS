import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
    try {
        // requesting token
        const token = req.headers.authorization?.split(" ")[1];
        // check if token exists
        if (!token) {
            res.status(401).json({
                message: "No Token Provided",
                success: false,
            });
            return;
        }
        // verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "secret");
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Auth Error: ", error);
        res.status(500).json({
            message: "Invalid or expired token",
            success: false,
        });
        return;
    }
};
