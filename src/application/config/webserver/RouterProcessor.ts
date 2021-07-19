import { Router } from "express";
import { HTTP_METHODS } from "../consts/Consts";
import check from "./AuthorizationCheck";
import RouterLayout from "./entities/RouterLayout";

export default function(routes: Array<RouterLayout>, router: Router): Router {
    routes.forEach(route => {     
        const authMethod = check(route.authType)

        switch(route.method) {
            case HTTP_METHODS.GET:
                router.get(route.path, authMethod, route.routerProcess)
                break
            case HTTP_METHODS.POST:
                router.post(route.path, authMethod, route.routerProcess)
                break
            default: 
                throw "Unmapped HTTP method"
        }
    })

    return router;
}
