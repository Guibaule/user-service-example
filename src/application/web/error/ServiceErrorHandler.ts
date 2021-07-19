import { Response } from "express";
import ServiceException from "../../../domain/exception/DefaultException"

export default function(err: ServiceException, res: Response): void {

    console.error(err)

    if (err.statusCode) res.status(err.statusCode)
    else res.status(500)

    if (err.msg && err.type) res.send({ type: err.type, msg: err.msg })
    else res.send({type: "INTERNAL_SERVER_ERROR", msg: "Internal Server Error"})
}

export function defaultError(res: Response): void {
    res.send({type: "INTERNAL_SERVER_ERROR", msg: "Internal Server Error"})
}