import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstant } from '../constants';
import { UserService } from 'src/user/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  
  @Inject(UserService)
  private readonly usersService: UserService;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret,
    });
  }

  async validate(payload: any) {
    const reconstructedToken = { id: payload.sub, email: payload.email, exp: payload.exp};
    if (reconstructedToken.id === undefined || reconstructedToken.email === undefined){
      return UnauthorizedException;
    }  else if(reconstructedToken.exp < Date.now() / 1000) {
      console.log("Token has expired!");
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Session has expired'
      }, HttpStatus.UNAUTHORIZED)

    } else {
      const user = await this.usersService.getUser(payload.sub); 
      return user;
    }
  }
}