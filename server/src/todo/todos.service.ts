import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(todo: Todo): Promise<Todo> {
    const newTodo = await this.todoRepository.save(todo);
    return newTodo;
  }

  async findAll(userId: number): Promise<Todo[]> {
    const todos = await this.todoRepository.find({ where: { userId } });
    return todos;
  }

  async findOne(userId: number, id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { userId, id } });
    return todo;
  }

  async update(userId: number, id: number, todo: Todo): Promise<Todo> {
    const updatedTodo = await this.todoRepository.save({
      userId,
      id,
      ...todo,
    });
    return updatedTodo;
  }

  async remove(userId: number, id: number): Promise<void> {
    await this.todoRepository.delete({ userId, id });
  }
}
