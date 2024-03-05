import { Types } from "mongoose";

export type UserPayload = {
    userId: Types.ObjectId;
    email: string;
}