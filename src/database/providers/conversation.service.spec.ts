// src/database/providers/conversation.service.e2e-spec.ts

import { INestApplication } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseModule } from "../database.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Conversation } from "../schemas/conversation.schema";
import { UserService } from "./user.service";
import { User, UserDocument } from "../schemas/user.schema";
import exp from "constants";

describe('ConversationService (e2e)', () => {
  let app: INestApplication;
  let conversationService: ConversationService;
  let userService: UserService;

  let mockUserDocument: UserDocument
  const mockUser1: User = {
    name: 'John Doe',
    email: 'p3H2x@example.com',
    password: 'password123',
  };

  const mockUser2: User = {
    name: 'Jane Doe',
    email: 'p3H2x1@example.com',
    password: 'password123',
  };

  const mockConversation: Conversation = {
    partisipans: [],
    messages: [],
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, MongooseModule.forRoot('mongodb://user:pass@mongo_db:27017/nest')],
    }).compile();

    app = await module.createNestApplication();
    await app.init();
    conversationService = await app.get(ConversationService);
    userService = await app.get(UserService);
    mockUserDocument = await userService.create(mockUser1);
    await userService.create(mockUser2);
  });

  afterAll(async () => {
    await conversationService.deleteAll();
    await userService.deleteAll();
    await app.close();
  });

  it('should create a conversation', async () => {
    let user1 = await userService.findByEmail(mockUser1.email);
    let user2 = await userService.findByEmail(mockUser2.email);
    mockConversation.partisipans = [user1, user2];
    await conversationService.create(mockConversation);
    const conversation = await conversationService.getAllConversations();
    expect(conversation.length).toEqual(1);
  });

  it('should find a conversation by User id', async () => {
    const conversation = await conversationService.getConversationByUserId(mockUserDocument._id); 

    expect(conversation).toBeDefined();
  });

  it('should add a message to a conversation', async () => {
    const conversations = await conversationService.getAllConversations();
    const message = { author: mockUserDocument, content: 'hello' }
    await conversationService.addMessageToConversation(conversations[0]._id, message);

    const conversation = (await conversationService.getConversationById(conversations[0]._id));
    
    expect(conversation).toBeDefined();
    expect(conversation.messages.length).toEqual(1);
    expect(conversation.messages[0].author).toEqual(mockUserDocument._id);
    expect(conversation.messages[0].content).toEqual(message.content);
  });

  it('should delete a conversation by id', async () => {
    const firstConversation = await conversationService.getAllConversations();

    await conversationService.delete(firstConversation[0]);
    const deletedConversation = await conversationService.getAllConversations();
    expect(deletedConversation).toEqual([]);
  });

});
