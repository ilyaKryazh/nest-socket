import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "src/database/providers/user.service";
import { UtilsService } from "src/database/providers/utils.servise";
import { User } from "src/database/schemas/user.schema";

@Injectable()
export class AuthenticationService {


    @Inject(UserService)
    private readonly userService: UserService

    @Inject(UtilsService)
    private readonly utils: UtilsService

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);

        if(!user){
            throw new Error('User not found');
        }

        const isMatch = await this.utils.checkPassword(password, user.password);

        if(!isMatch){
            throw new Error('Invalid password');
        }

        return user;
    }
}