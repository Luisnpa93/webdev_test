import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<UserEntity[]>;
    createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
}
