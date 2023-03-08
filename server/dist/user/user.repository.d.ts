import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class UserRepository extends Repository<UserEntity> {
    findAll(): Promise<UserEntity[]>;
    findOneById(id: number): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    createUser(email: string, password: string, age: number): Promise<UserEntity>;
}
