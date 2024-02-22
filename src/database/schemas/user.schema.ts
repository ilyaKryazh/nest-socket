import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({unique: true})
    name: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)