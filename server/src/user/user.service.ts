import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
 
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>


  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const { name, email, password, age } = userDto;
    if (!name || !email || !password || !age) {
      throw new BadRequestException('Name, Email, password, and age are required');
    }
  
    const user = new UserEntity();
    user.email = email;
    user.name = name; 
    await this.generatePassword(password,user);
    user.age = age;
  
    await this.userRepository.save(user);
  
    return user;
  }
  
  async getUser(userid: number) : Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id:userid } })
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  public async generatePassword(password: string, user: UserEntity) {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    return user;
    } 

  public async getUserByEmail(email: string): Promise<UserEntity>{
    return await this.userRepository.findOne({where: {email}})
  }

  public async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
    } 

}
