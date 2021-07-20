import { NextFunction, Request, Response } from "express";
import { AUTH_METHODS } from "../consts/Consts";
import Auth from "../middleware/Auth"

export default function check(authType: string): (req: Request, res : Response, next: NextFunction) => Promise<any> {
    switch(authType) {
        case AUTH_METHODS.CUSTOMER:
            return Auth.authValidation
            break;
        case AUTH_METHODS.SERVICE:
            return Auth.serviceAuth
            break;
        default:
            return Auth.noneAuth
            break;
    }
}
