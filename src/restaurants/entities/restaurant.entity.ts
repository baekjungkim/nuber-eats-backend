import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { Category } from './category.entity';

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

  @Field(type => Category)
  @ManyToOne(type => Category, category => category.restaurants)
  category: Category;
}
