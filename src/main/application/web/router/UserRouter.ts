import RouterInterface from './RouterInterface'
import RouterLayout from "../../config/webserver/entities/RouterLayout";
import { HTTP_METHODS, AUTH_METHODS } from '../../config/consts/Consts'
import { Request, Response } from 'express';
import Register from '../entity/RegisterRequest';
import UserController from '../controller/UserController';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class UserRouter implements RouterInterface {

    constructor(
        private userController: UserController
    ) {}

    register(): Array<RouterLayout> {
        const { GET, POST } = HTTP_METHODS
        return [
            new RouterLayout(POST, "/login", async (req: Request, res: Response) => {
                const request = new Register(req.body)
                const user = await this.userController.login(request.toLogin())
                res.status(200).send(user)
            }, AUTH_METHODS.NONE),

            new RouterLayout(POST, "/register", async (req: Request, res: Response) => {
                const request = new Register(req.body)
                await this.userController.register(request)
                res.status(201).end()
            }, AUTH_METHODS.NONE),

            new RouterLayout(GET, "/info", async (req: Request, res: Response) => {
                const user = await this.userController.info(req.authInfo.user)
                res.status(200).send(user)
            }, AUTH_METHODS.CUSTOMER),

            new RouterLayout(POST, "/info/creation-date", async (req: Request, res: Response) => {
                const user = await this.userController.info(req.body.user!)
                res.status(200).send({ createdAt: user.createdAt })
            }, AUTH_METHODS.SERVICE)
        ]
    }
}
