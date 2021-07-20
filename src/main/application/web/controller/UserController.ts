import { autoInjectable, injectable } from "tsyringe";
import Credentials from "../../../domain/entity/Credentials";
import jwt from 'jsonwebtoken'
import ManagementService from "../../../domain/service/ManagementService";
import LoginResponse from "../entity/LoginResponse";
import Register from "../entity/RegisterRequest";
import User from "../../../domain/entity/User";

@autoInjectable()
export default class UserController {

    constructor(private userService: ManagementService) {}

    async register(data: Register) {
        try {
            await this.userService.register(data.toDomain())
        } catch(e) {
            throw e
        }
    }

    async login(data: Credentials): Promise<LoginResponse> {
        const user = await (await this.userService.login(data)).user
        return new LoginResponse(
            jwt.sign({user}, process.env.CUSTOMER_SECRET as string, { expiresIn: process.env.JWT_DURATION })
        );
    }

    async info(user: string): Promise<User> {
        return await this.userService.info(user)
    }
}
