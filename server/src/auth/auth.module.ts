import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstant } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports:[UserModule,
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '1d' },
      }),
    PassportModule ],
      exports: [JwtModule]
})
export class AuthModule {}
