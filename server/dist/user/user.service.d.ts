import { UserEntity } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UserService {
    private readonly userRepository;
    createUser(userDto: CreateUserDto): Promise<UserEntity>;
    getUser(userid: number): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
    generatePassword(password: string, user: UserEntity): Promise<UserEntity>;
    getUserByEmail(email: string): Promise<UserEntity>;
    comparePassword(password: any, hash: any): Promise<any>;
}
