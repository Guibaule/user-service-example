import Credentials from "../../../domain/entity/Credentials";
import RegisterDomain from "../../../domain/entity/RegisterDomain";

export default class Register {
    username!: string;
    password!: string;

    constructor(source: Partial<Register>) {
        Object.assign(this, source);
    }

    toDomain(): RegisterDomain {
        return new RegisterDomain(this.username, this.password)
    }

    toLogin(): Credentials {
        return new Credentials(this.username, this.password)
    }
}
