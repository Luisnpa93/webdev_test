import { Body, Controller, Inject, Post, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  @Inject(AuthService)
  private readonly authService: AuthService;
  
  constructor(private readonly userService: UserService) {}
  
  @Post("signup")
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('Received request to create user:', createUserDto);
    const user = await this.userService.createUser(createUserDto);
    return user;
  }
  
    
    @Post('login')
    async login(@Request() req) {

    const userObj = this.authService.processAuthorizationBasic(
    req.headers.authorization,
    );

    return await this.authService.generateAccessToken(userObj);
    } 
}
