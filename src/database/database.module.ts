import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './providers/user.service';
import { UtilsService } from './providers/utils.servise';
import { Conversation, ConversationSchema } from './schemas/conversation.schema';
import { ConversationService } from './providers/conversation.service';

@Module({
    imports: [MongooseModule.forFeature([
        {name: User.name, schema: UserSchema}, 
        {name: Conversation.name, schema: ConversationSchema}
    ])],
    providers: [UserService, ConversationService, UtilsService],
    exports: [UserService, ConversationService, UtilsService]
})
export class DatabaseModule {}
