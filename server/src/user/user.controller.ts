import { Body, Controller, Get, Post, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    ) {}

  

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto);
  }
   
   
  @UseGuards(JwtAuthGuard)
@Get('data')
async getUserData(@Req() request: any): Promise<{ id: number; email: string; age: number }> {
  const user = request.user;
  return { id: user.id, email: user.email, age: user.age };
}



  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.getUser(id);
  }

  

}
