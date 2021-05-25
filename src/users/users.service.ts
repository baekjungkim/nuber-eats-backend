import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<string | undefined> {
    try {
      // check new user
      const exists = await this.usersRepository.findOne({ email });
      if (exists) {
        return 'Ther is a user with that email already';
      }

      // crdate user & hash the password
      await this.usersRepository.save(
        this.usersRepository.create({ email, password, role }),
      );
    } catch (e) {
      return "Couldn't create account";
    }
  }
}
