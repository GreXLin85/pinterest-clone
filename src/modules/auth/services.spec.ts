import { AuthService } from "./services";
import prisma from "../../interfaces/Prisma";

describe("AuthService", () => {
    describe("Register", () => {
        it("is registering with correct credentials", async () => {
            const register = await AuthService.register("User2", "user2")

            expect(register.id).toBeDefined();
            expect(register.username).toBe("User2");
        })
    })

    describe("Login", () => {
        it("is logging in with correct credentials", async () => {
            const login = await AuthService.login("User2", "user2")

            expect(login.id).toBeDefined();
            expect(login.username).toBe("User2");
        })
    })

    afterAll(async () => {
        await prisma.user.delete({
            where: {
                username: "User2"
            }
        })
        return await prisma.$disconnect()
    })

})