import { UserService } from '../user/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class SignupController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<import("../user/user.entity").UserEntity>;
}
