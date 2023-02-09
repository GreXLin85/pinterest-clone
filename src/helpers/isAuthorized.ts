import { Permission } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import prisma from "../interfaces/Prisma";
import MessageHelper from "./MessageHelper";

function checkPermissions(permissionsNeeded: Permission[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const user = req.user;

    const userRole = await prisma.user.findUnique({
      where: {
        id: user.id,
      }
    }).role({
      select: {
        permissions: true
      }
    }) as {
      permissions: Permission[];
    }

    const hasPermission = permissionsNeeded.every((permissionNeeded) => {
      return userRole.permissions.includes(permissionNeeded);
    });

    if (hasPermission) {
      return next();
    } else {
      return MessageHelper('You do not have permission to do this', true, res)
    }

  }
}

export default checkPermissions;