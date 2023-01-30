import { Permission } from "@prisma/client";
import { Request, Response } from "express";
import MessageHelper from "../../helpers/MessageHelper";
import { RoleService } from "./services";

export class RoleController {
    private roleService = new RoleService();

    getRole = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const role = await this.roleService.getRoleById(Number(id));

            if (!role) {
                return MessageHelper("Role not found", true, res);
            }

            return MessageHelper(role, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    getRoleByName = async (req: Request, res: Response) => {
        try {
            const { name } = req.params as { name: string };
            const role = await this.roleService.getRoleByName(name);

            return MessageHelper(role, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    getRoles = async (req: Request, res: Response) => {
        try {
            // Request query params are always strings by default so we need to cast them to numbers
            const { take, skip } = req.query as unknown as { take: number, skip: number };

            const roles = await this.roleService.getRoles(skip, take);

            return MessageHelper(roles, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    createRole = async (req: Request, res: Response) => {
        try {
            const { name, permissions } = req.body as { name: string, permissions: Permission[] };
            const role = await this.roleService.createRole(name, permissions);

            return MessageHelper(role, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    updateRole = async (req: Request, res: Response) => {
        try {
            const { id } = req.params as { id: string };
            const { name } = req.body as { name: string };
            const role = await this.roleService.updateRole(Number(id), { name });

            return MessageHelper(role, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }

    deleteRole = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const role = await this.roleService.deleteRole(Number(id));

            return MessageHelper(role, false, res);
        } catch (error: any) {
            return MessageHelper(error.message, true, res);
        }
    }
}