import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, UserEntity])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
