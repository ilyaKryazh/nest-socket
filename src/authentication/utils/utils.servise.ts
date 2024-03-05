import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class UtilsService {
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
      }
    
      async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
      }
}