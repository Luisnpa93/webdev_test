import { Inject, Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  constructor() {}

  async generateAccessToken(user: { email: string; password: string; }) {
    const { email, password } = user;
  
    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+.])(?!.*\s).{8,}$/;


    if (!passwordRegex.test(password)) {
      throw new Error('Password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter and one symbol.');
    }
  
    try {
      return this.userService.getUserByEmail(email).then(async (r: any) => {
        const payload = { email: r.email, sub: r.id };
        const validated = await this.userService.comparePassword(password, r.password);
        if (!validated) throw Error('Password incorrect');
        if (r) {
          const access_token = this.jwtService.sign(payload, { expiresIn: '1d' });
          const jwtObj: any = this.jwtService.decode(access_token);
          const user = await this.userService.getUser(r.id);
          return {
            user,
            tokenData: {
              expires_at: new Date(jwtObj.exp * 1000),
              token: access_token,
            },
          };
        } else {
          return UnauthorizedException;
        }
      });
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

  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.response?.status === HttpStatus.UNAUTHORIZED) {
          if (error.response.data && error.response.data.message === 'Token expired') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
          }
          return throwError(new HttpException('Unauthorized', HttpStatus.SERVICE_UNAVAILABLE));
        }
        return throwError(error);
      }),
    );
  }
  
  

}
