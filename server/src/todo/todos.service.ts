import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { UserEntity } from '../user/user.entity';
import { CreateTodoDto } from '../dto/todo.dto';
import { TodoStatus } from './todo-status.enum';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userId: number, createTodoDto: CreateTodoDto): Promise<Todo> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const newTodo = new Todo();
    newTodo.description = createTodoDto.description;
    newTodo.status = TodoStatus.PENDING; 
    newTodo.user = user;
  
    await this.todoRepository.save(newTodo);
    return newTodo;
  }
  

  async findAll(userId: number): Promise<Todo[]> {
    const todos = await this.todoRepository.find({ where: { user: { id: userId } } });
    return todos;
  }

  async findOne(userId: number, id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { user: { id: userId }, id } });
    return todo;
  }

  async update(userId: number, id: number, updateTodoDto: Partial<Todo>): Promise<Todo> {
    await this.todoRepository.update({ user: { id: userId }, id }, updateTodoDto);
    const updatedTodo = await this.todoRepository.findOne({ where: { user: { id: userId }, id } });
    return updatedTodo;
  }

  async remove(userId: number, id: number): Promise<void> {
    await this.todoRepository.delete({ user: { id: userId }, id });
  }
}
