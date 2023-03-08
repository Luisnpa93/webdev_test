import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
    @Inject(UserService)
    private readonly userService: UserService;
    @Inject(JwtService)
    private readonly jwtService: JwtService; 

    async generateAccessToken(user: {email: string, password: string}) {
        try {
        return this.userService.getUserByEmail(user.email).then(async (r: any) => {
        const payload = { email: r.email, sub: r.id };
        const validated = await this.userService.comparePassword(user.password, r.password);
        if(!validated) throw Error('Password incorrect')
        if (r) {
        const access_token = this.jwtService.sign(payload);
        const jwtObj: any = this.jwtService.decode(access_token);
        const user = await this.userService.getUser(r.id);
        return {
        user,
        tokenData: {
        expires_at: new Date(jwtObj.exp * 1000),
        token: access_token,
        }
        
        };
        } else {
        return UnauthorizedException;
        }
        });
        } catch (e) {
        throw new Error('There was an issue login in');
        }
        } 
        
        
        
        
        
        public processAuthorizationBasic(encodedInfo) : {email: string, password: string} {
        const strings = encodedInfo.split(' ');
        const token = strings[strings.length - 1];
        const userinfo = Buffer.from(token, 'base64').toString('ascii').split(':');
        return { email: userinfo[0], password: userinfo[1] };
        } 
    
}
