import { container } from "tsyringe";
import UserRouter from "../../web/router/UserRouter";

export default [
    container.resolve(UserRouter)
]
