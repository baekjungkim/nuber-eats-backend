import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';

type UserRole = 'client' | 'owner' | 'delivery';

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

  @Column()
  @Field(type => String)
  role: UserRole;
}
