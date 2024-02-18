import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Chat } from "./chat.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    name: string

    @Prop({required: true, unique: true})
    email!: string

    @Prop({required: true})
    password!: string

    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Chat' }] })
    chats: Chat[]
}

export const UserSchema = SchemaFactory.createForClass(User)