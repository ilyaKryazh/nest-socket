import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";

@Schema()
export class Message {
    @Prop()
    message: string
    @Prop()
    date: Date
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User
}

@Schema()
export class Chat {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    owners: User[]
    
    @Prop({type: Message})
    message: Message[]

    date: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

