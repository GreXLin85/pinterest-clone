import { Role } from "@prisma/client";
import prisma from "./interfaces/Prisma";

async function main() {
    await prisma.role.createMany({
        data: [
            {
                name: 'ADMIN',
                permissions: ["READ_USER", "CREATE_USER", "UPDATE_USER"]
            },
            {
                name: 'USER',
                permissions: ["READ_USER"]
            },
        ]
    });

    const adminRole = await prisma.role.findUnique({
        where: {
            name: 'ADMIN'
        }
    }) as Role;

    const userRole = await prisma.role.findUnique({
        where: {
            name: 'USER'
        }
    }) as Role;

    await prisma.user.createMany({
        data: [
            {
                username: 'Admin',
                password: 'admin',
                roleId: adminRole.id
            },
            {
                username: 'User',
                password: 'user',
                roleId: userRole.id
            }
        ]
    });

    console.log('Seeding done');
}

main()