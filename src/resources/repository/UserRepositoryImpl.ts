import { injectable } from "tsyringe";
import Credentials from "../../domain/entity/Credentials";
import RegisterDomain from "../../domain/entity/RegisterDomain";
import User from "../../domain/entity/User";
import ConflictException from "../../domain/exception/ConflictException";
import InvalidAuthException from "../../domain/exception/InvalidAuthException";
import NotFoundException from "../../domain/exception/NotFoundException";
import UserRepository from "../../domain/repository/UserRepository";
import { userModel } from "../database/Models";
import { sha512 } from "../tools/Crypto";

@injectable()
export default class UserRepositoryImpl implements UserRepository {
    async get(user: string): Promise<User | null> {
        const users = await userModel.find({user}).exec()

        if (users.length == 0) return null

        const us = users.shift()
        return new User(`${us!.user}`, `${us!.pwd}`, us!.createdAt)
    }

    async exists(user: string): Promise<boolean> { 
        const resp = await userModel.find({user}).exec()

        if (resp.length > 0) return true
        else return false
    }

    async create(register: RegisterDomain): Promise<void> {
        await userModel.create({...register, pwd: this.hashPassword(register.pwd), createdAt: new Date()})
    }

    async login(credentials: Credentials): Promise<User> {
        const users = await (await userModel.find({user: credentials.user}))

        if (users.length == 0) throw new NotFoundException()

        const usersFiltered = users.filter(user => user.pwd == this.hashPassword(credentials.pwd))

        if (usersFiltered.length > 1) throw new ConflictException()
        else if (usersFiltered.length == 0) throw new InvalidAuthException()

        const user = usersFiltered.shift()
        return new User(`${user!.user}`, `${user!.pwd}`, user!.createdAt)
    }

    private hashPassword(password: string): string {
        return sha512(password, process.env.HASH_SECRET as string).passwordHash
    }
}
