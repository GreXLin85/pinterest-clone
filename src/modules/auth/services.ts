import { verify } from "../../helpers/JWTHelper";
import prisma from "../../interfaces/Prisma";
import { UserService } from "../user/services";
export class AuthService {
    private userService = new UserService();

    login = async (username: string, password: string) => {
        if (!username || !password) {
            throw new Error("Username or password is empty");
        }

        const user = await this.userService.getUserByUsername(username);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.password !== password) {
            throw new Error("Password is incorrect");
        }

        return user;
    }

    getUserByToken = async (token: string) => {
        let userId: number;
        try {
            userId = verify(token).id;
        } catch (error) {
            throw new Error("Invalid token");
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                role: true,
                posts: true,
                comments: true,
            }
        })

        if (!user) {
            throw new Error("User not found");
        }

        // @ts-ignore
        delete user.password;

        return user;
    }

    register = async (username: string, password: string) => {
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

        const user = await this.userService.createUser(username, password, userRole.id);

        return user;
    }
}