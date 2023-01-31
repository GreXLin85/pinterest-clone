import { UserService } from "./services";
import prisma from "../../interfaces/Prisma";

describe("UserService", () => {
    let user: { id: any; username: any; password?: string; roleId?: number; createdAt?: Date; updatedAt?: Date; }
    const userService = new UserService()
    it("is creating a user", async () => {
        user = await userService.createUser("User8", "user1", 1)

        expect(user.username).toBe("User8");
    })
    it("is getting a user by id", async () => {
        const getUser = await userService.getUserById(user.id)

        expect(getUser?.username).toBe("User8");
    })
    it("is getting a user by username", async () => {
        const getUser = await userService.getUserByUsername(user.username)

        expect(getUser?.username).toBe("User8");
    })
    it("is updating a user", async () => {
        const updateUser = await userService.updateUser(user.id, {
            username: "User9"
        })

        expect(updateUser?.username).toBe("User9");
    })
    it("is deleting a user", async () => {
        const deleteUser = await userService.deleteUser(user.id)

        expect(deleteUser.id).toBeDefined();
    })


    afterAll(async () => {
        return await prisma.$disconnect()
    })

})