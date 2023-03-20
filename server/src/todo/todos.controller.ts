import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTodoDto, UpdateTodoDto } from '../dto/todo.dto';
import { ReqUser } from '../decorators/user.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@ReqUser() user: UserEntity, @Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(user.id, createTodoDto);
  }

  @Get()
  async findAll(@ReqUser() user: UserEntity): Promise<Todo[]> {
    return this.todosService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@ReqUser() user: UserEntity, @Param('id') id: string): Promise<Todo> {
    return this.todosService.findOne(user.id, +id);
  }

  @Patch(':id')
  async update(
    @ReqUser() user: UserEntity,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const todo = { ...updateTodoDto, status: updateTodoDto.status || undefined };
    return this.todosService.update(user.id, +id, todo);
  }

  @Delete(':id')
  async remove(@ReqUser() user: UserEntity, @Param('id') id: string): Promise<void> {
    return this.todosService.remove(user.id, +id);
  }
}
