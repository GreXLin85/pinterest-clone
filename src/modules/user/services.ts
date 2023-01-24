import { Prisma } from "@prisma/client";
import prisma from "../../interfaces/Prisma";

export class UserService {
    static getUserById = async (id: number) => {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user;
    }

    static getUserByUsername = async (username: string) => {
        const user = await prisma.user.findUnique({
            where: {
                username
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
            skip,
            take,
        })

        return users;
    }

    static createUser = async (username: string, password: string, roleId: number) => {
        const user = await this.getUserByUsername(username)

        if(user) {
            throw new Error("User already exists");
        }
        
        const createdUser = await prisma.user.create({
            data: {
                username,
                password,
                role: {
                    connect: {
                        id: roleId
                    }
                }
            }
        })

        return createdUser;
    }

    static updateUser = async (id: number, updateData: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>) => {
        const user = await this.getUserById(id);
        
        if(!user) {
            throw new Error("User not found");
        }
        
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: updateData
        })

        return updatedUser;
    }

    static deleteUser = async (id: number) => {
        const user = await this.getUserById(id);

        if(!user) {
            throw new Error("User not found");
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id
            }
        })

        return deletedUser;
    }
}