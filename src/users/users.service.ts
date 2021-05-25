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

  async createAccount({ email, password, role }: CreateAccountInput) {
    try {
      // check new user
      const exists = await this.usersRepository.findOne({ email });
      if (exists) {
        // make error
        return;
      }

      // crdate user & hash the password
      await this.usersRepository.save(
        this.usersRepository.create({ email, password, role }),
      );
      return true;
    } catch (e) {
      return;
    }
  }
}
