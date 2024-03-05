import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "src/database/providers/user.service";
import { UtilsService } from "src/authentication/utils/utils.servise";
import { User, UserDocument } from "src/database/schemas/user.schema";
import { UserPayload } from "../utils/types/userPayload.type";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthenticationService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly utils: UtilsService,
        ) {}

    getAccessToken(user: UserDocument){ 
        const payload: UserPayload = { userId: user._id, email: user.email };
        return this.jwtService.sign(payload);
    }

    async validateUser(email: string, password: string): Promise<UserDocument> {
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