import { SubscribeMessage, WebSocketGateway, WsException, WsResponse } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { UseGuards } from '@nestjs/common';
import { WSAuthGuard } from './ws-auth.guard';
import { UserService } from '../database/providers/user.service';
import { ConversationPayload, ConversationService } from '../database/providers/conversation.service';
import { Conversation } from '../database/schemas/conversation.schema';

export type AuthSocket = Socket & {
    user: any;
};

@WebSocketGateway() //TODO: Implement MongoDB adapter
export class ChatGateway {
    constructor(
        private readonly userService: UserService,
        private readonly conversation: ConversationService
        ) {}

    @SubscribeMessage('ping')
    handlePing(client: Socket, payload: string): WsResponse<any> {

        return { event: 'ping', data:'pong'};
    }

    @UseGuards(WSAuthGuard)
    @SubscribeMessage('auth')
    handleAuth(client: AuthSocket, payload: string): WsResponse<any> {
        return { event: 'auth', data:'success'}
    }

    @UseGuards(WSAuthGuard)
    @SubscribeMessage('createChat')
    async handleCreateChat(client: AuthSocket, payload: any) {
        let reciever = await this.userService.findById(payload.reciever._id)
        if(!reciever) {
            throw new WsException('User not found');
        }
        try {

            const conversation: ConversationPayload = {
                partisipans: [client.user.userId, reciever._id],
                messages: []
            }

            const result = await this.conversation.create(conversation)
          
            client.emit('getConversations', result)
            
        } catch (error) {
            console.log(error)
            throw new WsException(error);
        }

        return { event: 'createChat', data:'AAA'}
    }

    @UseGuards(WSAuthGuard)
    @SubscribeMessage('getConversations')
    async handleGetConversations(client: AuthSocket, payload: any): Promise<WsResponse<any>> {
        try {
            const conversations = await this.conversation.getConversationByUserId(client.user._id)

            return { event: 'getConversations', data: conversations}
        } catch (error) {
            throw new WsException(error.message);
        }
    }



}