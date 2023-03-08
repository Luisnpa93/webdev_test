"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("./user/user.entity");
const config = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || '123456',
    database: process.env.DATABASE_NAME || 'clientinfo',
    entities: [user_entity_1.UserEntity],
    synchronize: true,
};
exports.default = config;
//# sourceMappingURL=database.js.map