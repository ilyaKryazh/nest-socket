import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { HashService } from "./hash.service";
import { User } from "src/schemas/user.schema";

@Injectable()
export class RegistrationService {
    constructor(
        private readonly userService: UserService,
        private readonly hashService: HashService
    ) {}
    getHello(): string {
        return 'Hello World!';
    }

    async register(user : User) {
        if(this.userService.checkUser(user.email)) {
            throw new Error('User already exists');
        }

        const hashPassword = await this.hashService.hashPassword(user.password);
        return await this.userService.createUser({ ...user, password: hashPassword });
    }
}