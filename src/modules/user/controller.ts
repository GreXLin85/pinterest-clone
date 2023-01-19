import { Request, Response } from "express";
import { sign } from "../../helpers/JWTHelper";
import MessageHelper from "../../helpers/MessageHelper";
import { UserService } from "./services";

export class UserController {
    getUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const user = await UserService.getUserById(Number(id));
            return MessageHelper(user, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    getUserByUsername = async (req: Request, res: Response) => {
        try {
            const { username } = req.params as { username: string };
            const user = await UserService.getUserByUsername(username);
            return MessageHelper(user, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    getUsers = async (req: Request, res: Response) => {
        try {
            // Request query params are always strings by default so we need to cast them to numbers
            let { take, skip } = req.query as unknown as { take: number, skip: number };

            const users = await UserService.getUsers(skip, take);
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
                username: username,
                password: password,
                roleId: roleId
            });
            return MessageHelper(user, false, res);
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