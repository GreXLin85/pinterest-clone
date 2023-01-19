import prisma from "../../interfaces/Prisma";

export class AuthService {
    static login = async (username: string, password: string) => {
        if (!username || !password) {
            throw new Error("Username or password is empty");
        }

        const user = await prisma.user.findFirst({
            where: {
                username: username,
                password: password
            }
        })

        if (!user) {
            throw new Error("User not found");
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
        })

        const user = await prisma.user.create({
            data: {
                username: username,
                password: password,
                Role: {
                    connect: {
                        id: userRole?.id
                    }
                }
            }
        })
        
        return user;
    }
}