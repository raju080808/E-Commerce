import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as { userId: string };

    console.log("Decoded:", decoded);

    // Attach user to req (BEST PRACTICE)
    (req as any).user = decoded;

    return next();   // <-- Important
  } catch (err) {
    console.log("JWT Error:", err);
    return res.status(403).json({ message: "Invalid or expired access token" });
  }
};
