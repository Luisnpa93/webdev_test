import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || '123456',
  database: process.env.DATABASE_NAME || 'clientinfo',
  entities: [UserEntity],
  synchronize: true,
};

export default config;