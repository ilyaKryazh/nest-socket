import { Module } from '@nestjs/common';
import { AuthenticationService } from './providers/authentication.service';
import { AppService } from 'src/app.service';
import { UserService } from 'src/database/providers/user.service';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [AuthenticationService,],
    exports: [],
})
export class AuthenticationModule {}
