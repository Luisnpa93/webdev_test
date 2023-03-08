import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), TypeOrmModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
