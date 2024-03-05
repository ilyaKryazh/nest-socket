import { Module } from '@nestjs/common';
import { AuthenticationService } from './providers/authentication.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { RegistrationService } from './providers/registration.service';
import { UtilsService } from './utils/utils.servise';
import { LocalStrategy } from './stategies/local.strategy';

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60s' },
        })
    ],
    providers: [AuthenticationService, RegistrationService, UtilsService, LocalStrategy],
    exports: [],
})
export class AuthenticationModule {}
