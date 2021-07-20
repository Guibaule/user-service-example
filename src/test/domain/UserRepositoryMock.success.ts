import Credentials from "../../main/domain/entity/Credentials"
import RegisterDomain from "../../main/domain/entity/RegisterDomain"
import User from "../../main/domain/entity/User"
import ConflictException from "../../main/domain/exception/ConflictException"
import InvalidAuthException from "../../main/domain/exception/InvalidAuthException"
import NotFoundException from "../../main/domain/exception/NotFoundException"
import UserRepository from "../../main/domain/repository/UserRepository"

export default class UserRepositoryMock implements UserRepository {

    private createdUser: Array<User> = []

    private getUserByUsername(username: string): Array<User> {
        return this.createdUser.filter(us => us.user == username)
    }

    async exists(username: string): Promise<boolean> { 
        const users = this.getUserByUsername(username)
        const user = users.length > 0 ? users[0] : null
        if (user == null || user.user !== username) return false
        else return true
     }

    async create(register: RegisterDomain): Promise<void> {
        this.createdUser.push(new User(register.user, register.pwd, new Date()))
     }

    async login(credentials: Credentials): Promise<User> { 
        const users = this.getUserByUsername(credentials.user)

        if (users.length == 0) throw new NotFoundException()
        if (users.length > 1) throw new ConflictException()

        const user = users[0]

        if (user.user == credentials.user && user.pwd == credentials.pwd) return user
        else throw new InvalidAuthException()
    }

    async get(user: string): Promise<User | null> {
        const users = this.getUserByUsername(user)
        if (users.length == 0) return null
        else return users[0]
    }
}