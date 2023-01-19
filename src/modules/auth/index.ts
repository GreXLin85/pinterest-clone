import prisma from "../../interfaces/Prisma";
import { AuthController } from "./controller";
import { AuthRoute } from "./route";
import { AuthService } from "./services";

let Auth = new AuthRoute()

export default Auth