import "reflect-metadata"
import repository from "./src/main/application/config/modules/repository"

repository.inject()
require('dotenv').config()

import UserService from "./src/main/application/web/UserService"

new UserService()
