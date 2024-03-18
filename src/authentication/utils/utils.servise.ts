import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

//TODO: Enable hashing with Bcrypt
@Injectable()
export class UtilsService {
    async hashPassword(password: string): Promise<string> {
        
        return new Promise((resolve) => resolve(password));
      }
    
      async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
        return true
      }
}