import { Todo } from '../todo/todo.entity';
export declare class UserEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    age: number;
    todos: Todo[];
}
