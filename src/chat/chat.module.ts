import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { DatabaseModule } from 'src/database/database.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [DatabaseModule],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
