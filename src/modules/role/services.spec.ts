import { RoleService } from "./services";
import prisma from "../../interfaces/Prisma";

describe("RoleService", () => {
    let roleId: number;
    const roleService = new RoleService()

    it("is creating a role", async () => {
        const role = await roleService.createRole("TEST_ROLE", [
            "CREATE_USER",
        ])

        roleId = role.id;

        expect(role.name).toBe("TEST_ROLE");
    })
    it("is getting a role by id", async () => {
        const getRole = await roleService.getRoleById(roleId)

        expect(getRole?.name).toBe("TEST_ROLE");
    })

    it("is getting a role by name", async () => {
        const getRole = await roleService.getRoleByName("TEST_ROLE")

        expect(getRole?.name).toBe("TEST_ROLE");
    })

    it("is updating a role", async () => {
        const updateRole = await roleService.updateRole(roleId, {
            name: "TEST_ROLE_UPDATED"
        })

        expect(updateRole?.name).toBe("TEST_ROLE_UPDATED");
    })

    it("is deleting a role", async () => {
        const deleteRole = await roleService.deleteRole(roleId)

        expect(deleteRole.id).toBeDefined();
    })

    afterAll(async () => {
        return await prisma.$disconnect()
    })

})