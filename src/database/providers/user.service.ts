import { Injectable, Type } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model, ObjectId, Types } from "mongoose";
import { User, UserDocument } from "../schemas/user.schema";

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async findByEmail(email: string): Promise<UserDocument> {
        return await this.userModel.findOne({ email }).exec();
    }

    async create(user: User): Promise<UserDocument> {
        return await this.userModel.create(user);
    }

    async findAll(): Promise<UserDocument[]> {
        return await this.userModel.find().exec();
    }

    async findById(userId: Types.ObjectId): Promise<UserDocument> {
      return await this.userModel.findById(userId).exec();
    }

    async delete(user: User) {
        await this.userModel.deleteOne(user).exec();
    }

    async deleteManyl(users: User[]) {
        await this.userModel.deleteMany(users).exec();
    }

    async deleteAll() {
        await this.userModel.deleteMany({}).exec();
    }
}