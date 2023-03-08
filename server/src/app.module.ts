import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { SignupController } from './signup/signup.controller';
import config from './database';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
  ],
  controllers: [AppController, SignupController],
  providers: [AppService, UserService],
})
export class AppModule {}