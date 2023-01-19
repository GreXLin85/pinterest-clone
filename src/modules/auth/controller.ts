import { Request, Response } from "express";
import { sign } from "../../helpers/JWTHelper";
import MessageHelper from "../../helpers/MessageHelper";
import { AuthService } from "./services";

export class AuthController {
    login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body as { username: string, password: string };
            const user = await AuthService.login(username, password);
            const token = sign(user.id);
            return MessageHelper({ token }, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body as { username: string, password: string };
            const user = await AuthService.register(username, password);
            const token = sign(user.id);
            return MessageHelper({ token }, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }
}