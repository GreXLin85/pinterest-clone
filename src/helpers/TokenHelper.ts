import { NextFunction, Request, Response } from "express";
import prisma from "../interfaces/Prisma";
import { verify } from "./JWTHelper";
import MessageHelper from "./MessageHelper";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"] as string;

  if (!token) {
    return MessageHelper("No token provided", true, res);
  }
  try {
    const decoded = verify(token);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      include: {
        role: true,
      },
    })

    if (!user) {
      return MessageHelper("Unauthorized!", true, res);
    }

    // @ts-ignore
    req.user = user;
  } catch (err) {
    return MessageHelper("Unauthorized!", true, res);
  }
  return next();
};

export {
  verifyToken,
};