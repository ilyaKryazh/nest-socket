import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../database/providers/user.service";
import { UtilsService } from "../../authentication/utils/utils.servise";
import { User } from "../../database/schemas/user.schema";
import { UserPayload } from "../utils/types/userPayload.type";

@Injectable()
export class RegistrationService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly utils: UtilsService,
        private readonly userService: UserService
        ) {}


    async register(user: User): Promise<string> {
        const userExists = await this.userService.findByEmail(user.email);
        
        if (userExists) {
            throw new Error('User already exists');
        }
        
        let hashedPassword = await this.utils.hashPassword(user.password);

        const userDocument =  await this.userService.create({...user, password: hashedPassword});

        const payload: UserPayload = {
            userId: userDocument._id,
            email: userDocument.email
        }

        return this.jwtService.sign(payload);
    }
}