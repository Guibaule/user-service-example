import { container } from "tsyringe"
import UserRepository from "../../../domain/repository/UserRepository"
import UserRepositoryImpl from "../../../resources/repository/UserRepositoryImpl"

export = {
    inject: () => {
        console.log("Registering Repositories")
        container.register<UserRepository>("UserRepository", { useClass: UserRepositoryImpl })
    }
}
