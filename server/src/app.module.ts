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
import { TodosController } from './todo/todos.controller';
import { TodosService } from './todo/todos.service';
import { TodosModule } from './todo/todos.module';
import { Todo } from './todo/todo.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Todo]),
    UserModule,
    ConfigModule, // add this line
    AuthModule, 
    TodosModule,
  ],
  controllers: [AppController, TodosController],
  providers: [AppService, TodosService],
})
export class AppModule {}
