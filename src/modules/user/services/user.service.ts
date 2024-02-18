import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";

@Injectable()
export class UserService {
    constructor(
        @Inject(User.name) private readonly userModel: Model<User>
    ) {}

    createUser(user: User): void {
        this.userModel.create(user)
    }

    checkUser(email: string): boolean {
        if (this.userModel.findOne({ email })) {
            return true;
        }        
            return false;    
    }
}