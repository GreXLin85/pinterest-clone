import { NextFunction, Request, Response } from "express";
import { verify } from "./JWTHelper";
import MessageHelper from "./MessageHelper";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"] as string;

  if (!token) {
    return MessageHelper("No token provided", true, res);
  }
  try {
    const decoded = verify(token);
    // @ts-ignore
    req.user = {
        id: decoded.id,
    };
  } catch (err) {
    return MessageHelper("Unauthorized!", true, res);
  }
  return next();
};

export {
  verifyToken,
};