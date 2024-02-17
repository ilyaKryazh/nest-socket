import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "./user.interface";

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_MODEL')
        private readonly userModel: Model<User>
    ){}

    
}