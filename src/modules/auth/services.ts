import prisma from "../../interfaces/Prisma";
import { UserService } from "../user/services";
export class AuthService {


    static login = async (username: string, password: string) => {
        if (!username || !password) {
            throw new Error("Username or password is empty");
        }

        const user = await UserService.getUserByUsername(username);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.password !== password) {
            throw new Error("Password is incorrect");
        }

        return user;
    }

    static register = async (username: string, password: string) => {
        if (!username || !password) {
            throw new Error("Username or password is empty");
        }

        const userRole = await prisma.role.findUnique({
            where: {
                name: "USER"
            },
            select: {
                id: true
            }
        }) as {
            id: number
        }

        const user = await UserService.createUser(username, password, userRole.id);

        return user;
    }
}