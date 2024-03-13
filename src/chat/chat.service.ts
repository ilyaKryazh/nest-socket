import { Injectable } from '@nestjs/common';
import { ConversationService } from 'src/database/providers/conversation.service';

@Injectable()
export class ChatService {
  constructor(private readonly conversation: ConversationService) {}
  
  getConversationById(id: string): any {
    
  }
  
  getAllConversations(): any {
    throw new Error('Method not implemented.');
  }
  
  createConversation(conversation: any): any {
    throw new Error('Method not implemented.');
  }

  addMessageToConversation(conversationId: string, message: any): any {
    throw new Error('Method not implemented.');
  }

  deleteConversation(conversationId: string): any {
    throw new Error('Method not implemented.');
  }
}
