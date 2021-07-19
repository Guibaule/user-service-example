import { Request, Response } from "express";
import ServiceErrorHandler from "../../../web/error/ServiceErrorHandler";

export default class RouterLayout { 
    
    constructor(    
        public method: string,
        public path: string,
        public callback: (req: Request, res: Response) => Promise<any>,
        public authType: string,
        public routerProcess = (req: Request, res: Response) => {
            this.callback(req, res)
            .catch(err => ServiceErrorHandler(err, res))
        }
    ) { }
}
