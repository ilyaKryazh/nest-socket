import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }

    async create(user: User): Promise<User> {
        return await this.userModel.create(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async delete(user: User) {
        await this.userModel.deleteOne(user).exec();
    }

    async deleteManyl(users: User[]) {
        await this.userModel.deleteMany(users).exec();
    }
}