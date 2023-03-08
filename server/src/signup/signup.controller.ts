import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('signup')
export class SignupController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('Received request to create user:', createUserDto);
    const user = await this.userService.createUser(createUserDto);
    return user;
  }
}
