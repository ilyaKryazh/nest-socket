import { Module } from '@nestjs/common';
import { AuthenticationService } from './providers/authentication.service';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { RegistrationService } from './providers/registration.service';
import { UtilsService } from './utils/utils.servise';
import { LocalStrategy } from './stategies/local.strategy';
import { AuthenticationController } from './authentication.controller';
import { JwtStrategy } from './stategies/jwt.strategy';

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '10s' },
        })
    ],
    providers: [AuthenticationService, RegistrationService, UtilsService, LocalStrategy, JwtStrategy],
    exports: [AuthenticationService],
    controllers: [AuthenticationController],
})
export class AuthenticationModule {}
