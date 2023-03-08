import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import config from './database';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config'; // add this line
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    ConfigModule, // add this line
    AuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
