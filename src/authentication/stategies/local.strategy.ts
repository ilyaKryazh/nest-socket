import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticationService } from "../providers/authentication.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly auth: AuthenticationService) { super({usernameField: 'email'}) }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.auth.validateUser(email, password);

        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }

        return user
    }
}