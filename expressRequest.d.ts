import { Role, User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: User & {
        role: Role;
      },
    }

  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }