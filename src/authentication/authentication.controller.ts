import { Controller, Post, Body, UseGuards, Request, Response } from '@nestjs/common';
import { AuthenticationService } from './providers/authentication.service';
import { UserLoginDto } from 'src/authentication/utils/dto/userLogin.dto';;
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RegistrationService } from './providers/registration.service';
import { UserDto } from './utils/dto/user.dto';


@Controller('/')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly regService: RegistrationService
    ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.getAccessToken(req.user);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  async register(@Body() user: UserDto) {
    return this.regService.register(user);
  }


}


