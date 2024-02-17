import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UserProvider } from "./user.provider";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [UserProvider],
})
export class UserModule {}