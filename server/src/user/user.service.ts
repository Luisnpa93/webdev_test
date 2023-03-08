import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const { email, password, age } = userDto;
    if (!email || !password || !age) {
      throw new BadRequestException('Email, password, and age are required');
    }
  
    const user = new UserEntity();
    user.email = email;
    user.password = password;
    user.age = age;
  
    await this.userRepository.save(user);
  
    return user;
  }
  

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
