import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/providers/authentication.service';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WSAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient<Socket>();

    const authToken = client.handshake.auth.token;

    if (!authToken) {
      return false;
    }
    try {
        const payload = this.jwtService.verify(authToken)
        if (!payload) {
          return false;
        } 
        
        context.switchToHttp().getRequest().user = payload
        return true
    } catch (error) {
      throw new WsException(error.message)
    }
    
  }
}



