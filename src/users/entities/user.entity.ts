import { InternalServerErrorException } from '@nestjs/common';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CommonEntity } from '../../common/entities/common.entity';

enum UserRole {
  Owner = 'Owner',
  Client = 'Client',
  Delivery = 'Delivery',
}
registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CommonEntity {
  @Column()
  @Field(type => String)
  email: string;

  @Column()
  @Field(type => String)
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field(type => UserRole)
  role: UserRole;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
