import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Conversation, Message, ConversationDocument } from "../schemas/conversation.schema";
import { UserService } from "./user.service";
import { ObjectId, Types } from "mongoose";

export type ConversationPayload = {
    partisipans: Types.ObjectId[],
    messages?: Message[]
}
@Injectable()
export class ConversationService {
   
    constructor(@InjectModel(Conversation.name) private readonly conversationModel,
    @Inject(UserService) private readonly userService: UserService) {}

    async create(conversation: ConversationPayload): Promise<ConversationDocument> {
       return await this.conversationModel.create(conversation);
    }

    async delete(conversation: Conversation): Promise<boolean> {
        await this.conversationModel.deleteOne(conversation).exec();
        return true;
    }

    async deleteAll(): Promise<void> {
        await this.conversationModel.deleteMany({}).exec();
    }

    async addMessageToConversation(conversationId: Types.ObjectId, message: Message): Promise<ConversationDocument> {
        return await this.conversationModel.updateOne({ _id: conversationId }, { $push: { messages: message } }).exec();
    }

    async getAllConversations(): Promise<ConversationDocument[]> {
        return await this.conversationModel.find({}).exec();
    }

    async getConversationById(conversationId: Types.ObjectId): Promise<ConversationDocument> {
        return await this.conversationModel.findOne({ _id: conversationId }).exec();
    }

    async getConversationByUserId(userId: Types.ObjectId): Promise<ConversationDocument[]> {
        const user = await this.userService.findById(userId);
        if(!user) {
            throw new Error('User not found');
        }
        return await this.conversationModel.find({ partisipans: user }).exec();
    }
}