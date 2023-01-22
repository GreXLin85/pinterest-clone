import { Request, Response } from "express";
import MessageHelper from "../../helpers/MessageHelper";
import { UserService } from "./services";

export class UserController {
    getUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const user = await UserService.getUserById(Number(id));

            if (!user) {
                return MessageHelper("User not found", true, res);
            }

            // We don't want to send the password to the client
            // @ts-ignore
            delete user?.password;

            return MessageHelper(user, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    getUserByUsername = async (req: Request, res: Response) => {
        try {
            const { username } = req.params as { username: string };
            const user = await UserService.getUserByUsername(username);

            if (!user) {
                return MessageHelper("User not found", true, res);
            }

            // We don't want to send the password to the client
            // @ts-ignore
            delete user?.password;

            return MessageHelper(user, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    getUsers = async (req: Request, res: Response) => {
        try {
            // Request query params are always strings by default so we need to cast them to numbers
            const { take, skip } = req.query as unknown as { take: number, skip: number };

            const users = await UserService.getUsers(skip, take);

            // We don't want to send the password to the client
            users.forEach(user => {
                // @ts-ignore
                delete user?.password;
            });

            return MessageHelper(users, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const { username, password, roleId } = req.body as { username: string, password: string, roleId: number };
            const user = await UserService.createUser(username, password, roleId);
            return MessageHelper(user, false, res);
        } catch (error: any) {
            if (error.message.includes("Unique constraint failed")) {
                return MessageHelper("User already exists", true, res);
            }
            return MessageHelper(error.message, true, res);
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const { username, password, roleId } = req.body as Partial<{ username: string, password: string, roleId: number }>;
            const user = await UserService.updateUser(Number(id), {
                username,
                password,
                roleId
            });
            return MessageHelper(user, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    updatePassword = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const { oldPassword, newPassword } = req.body as { oldPassword: string, newPassword: string };
            const user = await UserService.getUserById(Number(id));

            if (!user) {
                return MessageHelper("User not found", true, res);
            }

            if (user.password !== oldPassword) {
                return MessageHelper("Incorrect password", true, res);
            }

            const updatedUser = await UserService.updateUser(Number(id), {
                password: newPassword
            });

            return MessageHelper(updatedUser, false, res);

        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const user = await UserService.deleteUser(Number(id));
            return MessageHelper(user, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }
}