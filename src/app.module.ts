import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://user:pass@mongo_db:27017/nest'), 
    DatabaseModule, 
    AuthenticationModule, 
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
