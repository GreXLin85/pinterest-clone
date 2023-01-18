import { Application } from "express";

export default (app: Application, routes: any[]) => {
    routes.forEach(route => {
        route.routes(app);
    })
}