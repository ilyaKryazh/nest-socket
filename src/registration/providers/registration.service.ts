import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "src/database/providers/user.service";
import { UtilsService } from "src/database/providers/utils.servise";
import { User } from "src/database/schemas/user.schema";

@Injectable()
export class RegistrationService {

    @Inject(UserService)
    private readonly userService: UserService

    @Inject(UtilsService)
    private readonly utils: UtilsService

    async register(user: User): Promise<User> {
        const userExists = await this.userService.findByEmail(user.email);

        if (userExists) {
            throw new Error('User already exists');
        }

        let hashedPassword = await this.utils.hashPassword(user.password);

        return await this.userService.create({...user, password: hashedPassword});
    }
}