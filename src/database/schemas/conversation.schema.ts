import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import mongoose, { HydratedDocument } from "mongoose";

export type ConversationDocument = HydratedDocument<Conversation>;
export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name})
    author: User
    @Prop({required: true})
    content: string

}

@Schema()
export class Conversation {
    @Prop({required: true, type: [mongoose.Schema.Types.ObjectId], ref: User.name}) //TODO: length prohibition
    partisipans: User[];
    
    @Prop({type: [Message]})
    messages?: Message[]
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export const ConversationSchema = SchemaFactory.createForClass(Conversation);

