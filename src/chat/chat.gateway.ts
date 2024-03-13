import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway() //TODO: Implement MongoDB adapter
// @UseGuards(new JwtAuthGuard())
export class ChatGateway {

    @SubscribeMessage('ping')
    handlePing(client: Socket, payload: string): WsResponse<any> {
        console.log('ping success')
        return { event: 'ping', data:'pong'};
    }

}