import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};
