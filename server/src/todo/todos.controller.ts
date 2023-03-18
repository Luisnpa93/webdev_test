import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';


@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Req() req, @Body() todo: Todo): Promise<Todo> {
    const { user } = req;
    todo.userId = user.id;
    return this.todosService.create(todo);
  }

  @Get()
async findAll(@Req() req): Promise<Todo[]> {
  const { user } = req;
  if (!user) {
    throw new UnauthorizedException('User not found');
  }
  return this.todosService.findAll(user.id);
}


  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string): Promise<Todo> {
    const { user } = req;
    return this.todosService.findOne(user.id, +id);
  }

  @Put(':id')
async update(
  @Req() req,
  @Param('id') id: string,
  @Body() todo: Todo,
): Promise<Todo> {
  const { user } = req;
  const { status } = todo;
  return this.todosService.update(user.id, +id, { ...todo, status });
}


  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string): Promise<void> {
    const { user } = req;
    return this.todosService.remove(user.id, +id);
  }
}
