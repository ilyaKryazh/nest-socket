import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { HashService } from "./hash.service";
import { User } from "src/schemas/user.schema";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly hashService: HashService
    ){}

    async login(user: User): Promise<void> {
        if(!(await this.userService.checkUser(user.email))) {
            throw new Error('User not found');
        }

        if(!(await this.hashService.comparePassword(user.password, user.password))){
            throw new Error('Wrong password');
        }
        
        // TODO: Generate JWT

    }
}
