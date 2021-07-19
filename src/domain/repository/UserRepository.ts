import Credentials from "../entity/Credentials";
import RegisterDomain from "../entity/RegisterDomain";
import User from "../entity/User";

export default interface UserRepository {
    exists(username: string): Promise<boolean>
    create(register: RegisterDomain): Promise<void>
    login(credentials: Credentials): Promise<User>
    get(user: string): Promise<User | null>
}
