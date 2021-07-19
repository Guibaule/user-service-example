import { inject, injectable } from "tsyringe";
import Credentials from "../entity/Credentials";
import RegisterDomain from "../entity/RegisterDomain";
import User from "../entity/User";
import ConflictException from "../exception/ConflictException";
import NotFoundException from "../exception/NotFoundException";
import UserRepository from "../repository/UserRepository";

@injectable()
export default class ManagementService {
    private CONFLICT_EXCEPTION = new ConflictException()
    private NOT_FOUND_EXCEPTION = new NotFoundException()

    constructor(
        @inject("UserRepository") private userRepository: UserRepository
    ) {}

    async register(data: RegisterDomain): Promise<void> {
        const exists = await this.userRepository.exists(data.user)
        if (exists) throw this.CONFLICT_EXCEPTION
        this.userRepository.create(data)
    }

    async login(credentials: Credentials): Promise<User> {
        return await this.userRepository.login(credentials)
    }

    async info(user: string): Promise<User> {
        const us = await this.userRepository.get(user)
        if (us == null) throw this.NOT_FOUND_EXCEPTION
        else return us
    }
}
