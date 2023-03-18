"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const database_1 = require("./database");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const todos_controller_1 = require("./todo/todos.controller");
const todos_service_1 = require("./todo/todos.service");
const todos_module_1 = require("./todo/todos.module");
const todo_entity_1 = require("./todo/todo.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(database_1.default),
            typeorm_1.TypeOrmModule.forFeature([todo_entity_1.Todo]),
            user_module_1.UserModule,
            config_1.ConfigModule,
            auth_module_1.AuthModule,
            todos_module_1.TodosModule,
        ],
        controllers: [app_controller_1.AppController, todos_controller_1.TodosController],
        providers: [app_service_1.AppService, todos_service_1.TodosService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map