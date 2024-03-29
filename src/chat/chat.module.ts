import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { DatabaseModule } from '../database/database.module';
import { ChatGateway } from './chat.gateway';
import { WSAuthGuard } from './ws-auth.guard';
import { AuthenticationModule } from '../authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule, 
    AuthenticationModule, 
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '10s' },
  })],
  providers: [ChatService, ChatGateway, WSAuthGuard],
})
export class ChatModule {}
