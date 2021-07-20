import "reflect-metadata"
import Credentials from "../main/domain/entity/Credentials";
import RegisterDomain from "../main/domain/entity/RegisterDomain";
import ConflictException from "../main/domain/exception/ConflictException";
import NotFoundException from "../main/domain/exception/NotFoundException";
import ManagementService from "../main/domain/service/ManagementService";
import UserRepositoryMock from "./domain/UserRepositoryMock.success";
import assert from 'assert'

describe('Success Cases Service', () => {
    let repository = new UserRepositoryMock()
    let instance = new ManagementService(repository)
    const NOT_FOUND = NotFoundException
    const CONFLICT = ConflictException

    beforeEach(() => {
        repository = new UserRepositoryMock()
        instance = new ManagementService(repository)
    })

    describe('register', () => {
        it('create user', async() => {
            await instance.register(new RegisterDomain("test", "123456"))
            const user = await instance.info("test")
    
            assert.equal("123456", user.pwd)
            assert.equal("test", user.user)
        })

        it('should throw exception when try to register the same user', async() => {
            await instance.register(new RegisterDomain("test", "123456"))

            try {
                await instance.register(new RegisterDomain("test", "123456"))
            } catch (error) {
                assert.equal(true, error instanceof CONFLICT)
            }
        })

        it('get unexistent user', async() => {
            try {
                await instance.info("test")
            } catch (error) {
                assert.equal(true, error instanceof NOT_FOUND)
            }
        })
    })

    describe('login', () => {
        it('create user', async() => {
            await instance.register(new RegisterDomain("test", "123456"))
            const login = await instance.login(new Credentials("test", "123456"))
    
            assert.equal("123456", login.pwd)
            assert.equal("test", login.user)
        })

        it('login unexistent user', async() => {
            try {
                await instance.login(new Credentials("test", "123456"))
            } catch (error) {
                assert.equal(true, error instanceof NOT_FOUND)
            }
        })

        it('must throw Conflict Exception when multiple users have the same username', async() => {
            await repository.create(new RegisterDomain("test", "123456"))
            await repository.create(new RegisterDomain("test", "123456"))

            try {
                await instance.login(new Credentials("test", "123456"))
            } catch (error) {
                assert.equal(true, error instanceof CONFLICT)
            }
        })
    })

})
