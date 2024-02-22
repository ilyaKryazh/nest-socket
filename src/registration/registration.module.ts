import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from 'src/database/providers/user.service';
import { RegistrationService } from './providers/registration.service';
import { AppModule } from 'src/app.module';

@Module({
    imports: [DatabaseModule],
    providers: [RegistrationService],
})
export class RegistrationModule {}
