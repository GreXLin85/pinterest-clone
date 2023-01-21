import { RoleService } from "./services";
import prisma from "../../interfaces/Prisma";

describe("RoleService", () => {
    let roleId: number;

    it("is creating a role", async () => {
        const role = await RoleService.createRole("TEST_ROLE", [
            "CREATE_USER",
        ])

        roleId = role.id;

        expect(role.name).toBe("TEST_ROLE");
    })
    it("is getting a role by id", async () => {
        const getRole = await RoleService.getRoleById(roleId)

        expect(getRole?.name).toBe("TEST_ROLE");
    })

    it("is getting a role by name", async () => {
        const getRole = await RoleService.getRoleByName("TEST_ROLE")

        expect(getRole?.name).toBe("TEST_ROLE");
    })

    it("is updating a role", async () => {
        const updateRole = await RoleService.updateRole(roleId, {
            name: "TEST_ROLE_UPDATED"
        })

        expect(updateRole?.name).toBe("TEST_ROLE_UPDATED");
    })

    it("is deleting a role", async () => {
        const deleteRole = await RoleService.deleteRole(roleId)

        expect(deleteRole.id).toBeDefined();
    })

    afterAll(async () => {
        return await prisma.$disconnect()
    })

})