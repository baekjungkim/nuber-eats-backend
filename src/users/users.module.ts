import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { VerificationResolver } from './verification.resolver';
import { VerificationService } from './verification.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  providers: [
    UsersResolver,
    UsersService,
    VerificationResolver,
    VerificationService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
