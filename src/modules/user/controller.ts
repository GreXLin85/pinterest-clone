import { Request, Response } from "express";
import isUserOwn from "../../helpers/isUserOwn";
import MessageHelper from "../../helpers/MessageHelper";
import { UserService } from "./services";

export class UserController {
    private userService = new UserService();

    getUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const user = await this.userService.getUserById(Number(id));

            if (!user) {
                return MessageHelper("User not found", true, res);
            }

            if(!isUserOwn(req.user.id, req.user.role.name, Number(id))) {
                return MessageHelper("You don't have permission to access this resource", true, res);
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
            const user = await this.userService.getUserByUsername(username);

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

            if (req.user.role.name !== "ADMIN") {
                return MessageHelper("You don't have permission to access this resource", true, res);
            }

            const users = await this.userService.getUsers(skip, take);

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
            const user = await this.userService.createUser(username, password, roleId);
            return MessageHelper(user, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const { username, password, roleId } = req.body as Partial<{ username: string, password: string, roleId: number }>;
            
            const user = await this.userService.getUserById(Number(id));

            if (!user) {
                return MessageHelper("User not found", true, res);
            }

            if(!isUserOwn(req.user.id, req.user.role.name, Number(id))) {
                return MessageHelper("You don't have permission to access this resource", true, res);
            }
            
            req

            const userUpdated = await this.userService.updateUser(Number(id), {
                username,
                password,
                roleId
            });
            return MessageHelper(userUpdated, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    updatePassword = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const { oldPassword, newPassword } = req.body as { oldPassword: string, newPassword: string };
            
            if (!isUserOwn(req.user.id, req.user.role.name, Number(id))) {
                return MessageHelper("You don't have permission to access this resource", true, res);
            }
            
            const user = await this.userService.getUserById(Number(id));

            if (!user) {
                return MessageHelper("User not found", true, res);
            }

            if (user.password !== oldPassword) {
                return MessageHelper("Incorrect password", true, res);
            }

            const updatedUser = await this.userService.updateUser(Number(id), {
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

            const user = await this.userService.getUserById(Number(id));

            if (!user) {
                return MessageHelper("User not found", true, res);
            }

            if (!isUserOwn(req.user.id, req.user.role.name, Number(id))) {
                return MessageHelper("You don't have permission to access this resource", true, res);
            }

            const userDeleted = await this.userService.deleteUser(Number(id));
            return MessageHelper(userDeleted, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }
}