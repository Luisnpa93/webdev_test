import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from '../auth/constants';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        
      ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService,TypeOrmModule],
})
export class UserModule {}
