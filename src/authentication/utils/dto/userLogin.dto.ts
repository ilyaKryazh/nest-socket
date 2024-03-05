import { UserDto } from "./user.dto";

export class UserLoginDto implements Omit<UserDto, 'name'> {
    email: string;
    password: string;  
}