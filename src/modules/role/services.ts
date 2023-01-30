import { Permission, Prisma } from "@prisma/client";
import prisma from "../../interfaces/Prisma";

export class RoleService {
    getRoleById = async (id: number) => {
        const role = await prisma.role.findUnique({
            where: {
                id
            }
        })

        return role;
    }

    getRoleByName = async (name: string) => {
        const role = await prisma.role.findUnique({
            where: {
                name
            }
        })

        return role;
    }

    getRoles = async (
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

        const roles = await prisma.role.findMany({
            skip,
            take,
        })

        return roles;
    }

    createRole = async (name: string, permissions: Permission[]) => {
        const role = await this.getRoleByName(name)

        if(role) {
            throw new Error("Role already exists");
        }
        
        const createdRole = await prisma.role.create({
            data: {
                name,
                permissions
            }
        })

        return createdRole;
    }

    updateRole = async (id: number, data: Prisma.RoleUpdateInput) => {
        const updatedRole = await prisma.role.update({
            where: {
                id
            },
            data
        })

        return updatedRole;
    }

    deleteRole = async (id: number) => {
        const deletedRole = await prisma.role.delete({
            where: {
                id
            }
        })

        return deletedRole;
    }
}