import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async generateAccessToken(user: { email: string; password: string; }) {
    const { email, password } = user;
  
    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+.])(?!.*\s).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error('Password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter and one symbol.');
    }
  
    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }
  
      const validated = await this.userService.comparePassword(password, user.password);
      if (!validated) {
        throw new Error('Password incorrect');
      }
  
      const payload = { email: user.email, sub: user.id };
      const access_token = this.jwtService.sign(payload);
      const jwtObj: any = this.jwtService.decode(access_token);
      return {
        user,
        tokenData: {
          expires_at: new Date(jwtObj.exp * 1000),
          token: access_token,
        },
      };
    } catch (e) {
      throw new Error('There was an issue logging in');
    }
  }
  

  public processAuthorizationBasic(encodedInfo): { email: string; password: string } {
    const strings = encodedInfo.split(' ');
    const token = strings[strings.length - 1];
    const userinfo = Buffer.from(token, 'base64').toString('ascii').split(':');
    return { email: userinfo[0], password: userinfo[1] };
  }
}
