import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { User } from '../../users/entities/user.entity';
import { Category } from './category.entity';

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CommonEntity {
  @Field(type => String)
  @Column()
  @IsString()
  @Length(30)
  name: string;

  @Field(type => String)
  @Column()
  @IsString()
  coverImage: string;

  @Field(type => String, { nullable: true })
  @Column()
  @IsOptional()
  @IsString()
  address: string;

  @Field(type => Category, { nullable: true })
  @ManyToOne(type => Category, category => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field(type => User)
  @ManyToOne(type => User, user => user.restaurants, { onDelete: 'CASCADE' })
  owner: User;
}
