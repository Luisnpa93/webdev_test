import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    createUser(userDto: CreateUserDto): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
}
