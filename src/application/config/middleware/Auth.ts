import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken'
import { AUTH_METHODS } from "../consts/Consts";

export default {
    authValidation: async function(req: any, res : Response, next: NextFunction): Promise<any> {
        if (!req.headers.authorization) return res.status(401).json({error: "Unauthorized"})

        let authToken = req.headers.authorization.replace("Bearer ", "");
        try {
            let jwtResp = await jwt.verify(authToken, process.env.CUSTOMER_SECRET as string)
            req.authInfo = jwtResp
            req.authType = AUTH_METHODS.CUSTOMER
            next()
        } catch(e) {
            console.log(e)
            return res.status(401).json({type: "Unauthorized", msg: "Invalid Token"})
        }
    },
    serviceAuth: async function(req: any, res : Response, next: NextFunction): Promise<any> {
        if (!req.headers.authorization) return res.status(401).json({error: "Unauthorized"})
        const authToken = req.headers.authorization;

        if (authToken == process.env.SERVICE_TOKEN) {
            req.authType = AUTH_METHODS.SERVICE
            next()
        } else {
            console.error("Invalid Auth Token")
            return res.status(401).json({error: "Unauthorized"})
        }
    },
    noneAuth: async function(req: any, res : Response, next: NextFunction): Promise<any> {
        req.authType = AUTH_METHODS.NONE
        next()
    }
}