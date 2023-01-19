import { UserService } from "./services";
import prisma from "../../interfaces/Prisma";

describe("UserService", () => {
    let user: { id: any; username: any; password?: string; roleId?: number; createdAt?: Date; updatedAt?: Date; }

    it("is creating a user", async () => {
        user = await UserService.createUser("User8", "user1", 1)

        expect(user.username).toBe("User8");
    })
    it("is getting a user by id", async () => {
        const getUser = await UserService.getUserById(user.id)

        expect(getUser?.username).toBe("User8");
    })
    it("is getting a user by username", async () => {
        const getUser = await UserService.getUserByUsername(user.username)

        expect(getUser?.username).toBe("User8");
    })
    it("is updating a user", async () => {
        const updateUser = await UserService.updateUser(user.id, {
            username: "User9"
        })

        expect(updateUser?.username).toBe("User9");
    })
    it("is deleting a user", async () => {
        const deleteUser = await UserService.deleteUser(user.id)

        expect(deleteUser.id).toBeDefined();
    })


    afterAll(async () => {
        return await prisma.$disconnect()
    })

})