import { IsEnum, IsOptional, IsString, MaxLength} from 'class-validator';
import { TodoStatus } from '../todo/todo-status.enum';

export class CreateTodoDto {
  @IsString()
  @MaxLength(255)
  description: string;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
