import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { UserSchema } from '../typeorm/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const userSchema = await this.userRepository.findOne({ where: { id } });
    return userSchema ? this.toDomain(userSchema) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userSchema = await this.userRepository.findOne({ where: { email } });
    return userSchema ? this.toDomain(userSchema) : null;
  }

  async create(user: Partial<User>): Promise<User> {
    const userSchema = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(userSchema);
    return this.toDomain(savedUser);
  }

  async save(user: User): Promise<User> {
    const savedUser = await this.userRepository.save(user);
    return this.toDomain(savedUser);
  }

  private toDomain(userSchema: UserSchema): User {
    return new User({
      id: userSchema.id,
      email: userSchema.email,
      password: userSchema.password,
      name: userSchema.name,
      createdAt: userSchema.createdAt,
    });
  }
}
