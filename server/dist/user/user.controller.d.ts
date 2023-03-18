import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserController {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    getAllUsers(): Promise<UserEntity[]>;
    createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    getUserData(request: any): Promise<{
        id: number;
        email: string;
        age: number;
    }>;
    getUser(id: number): Promise<UserEntity>;
}
