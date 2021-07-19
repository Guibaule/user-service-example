import "reflect-metadata"
import repository from "./src/application/config/modules/repository"

repository.inject()
require('dotenv').config()

import UserService from "./src/application/UserService"

new UserService()
