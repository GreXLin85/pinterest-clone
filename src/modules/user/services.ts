import { Prisma } from "@prisma/client";
import prisma from "../../interfaces/Prisma";

export class UserService {
    static getUserById = async (id: number) => {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return user;
    }

    static getUserByUsername = async (username: string) => {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        return user;
    }

    static getUsers = async (
        skip?: number,
        take?: number,
    ) => {
        take = Number(take);
        skip = Number(skip);

        if (!skip) {
            skip = 0;
        }

        if (!take) {
            take = 10;
        }

        if(take > 100) {
            take = 100;
        }

        const users = await prisma.user.findMany({
            skip: skip,
            take: take,
        })

        return users;
    }

    static createUser = async (username: string, password: string, roleId: number) => {
        const user = await prisma.user.create({
            data: {
                username: username,
                password: password,
                Role: {
                    connect: {
                        id: roleId
                    }
                }
            }
        })

        return user;
    }

    static updateUser = async (id: number, updateData: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>) => {
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: updateData
        })

        return user;
    }

    static deleteUser = async (id: number) => {
        const user = await prisma.user.delete({
            where: {
                id: id
            }
        })

        return user;
    }
}