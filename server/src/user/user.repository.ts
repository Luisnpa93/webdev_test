import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findAll(): Promise<UserEntity[]> {
    return this.find();
  }

  async findOneById(id: number): Promise<UserEntity> {
    return this.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.findOne({ where: { email } });
  }

  async createUser(email: string, password: string, age: number): Promise<UserEntity> {
    const user = this.create({ email, password, age });
    return await this.save(user);
  }
}
