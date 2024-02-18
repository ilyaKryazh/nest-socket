import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { RegistrationService } from "./services/registration.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [ ],
    providers: [ UserService, AuthService, RegistrationService ],
    exports: []
})
export class UserModule {}