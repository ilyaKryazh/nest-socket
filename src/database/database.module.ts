import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './providers/user.service';
import { UtilsService } from './providers/utils.servise';

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    providers: [UserService, UtilsService],
    exports: [UserService, UtilsService]
})
export class DatabaseModule {}
