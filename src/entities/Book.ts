import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Book {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({
        length: 100
    })
    name: string;

    @Field()
    @Column("text")
    description: string;

    @Field()
    @Column()
    filename: string;

    @Field()
    @Column("double")
    views: number;

    @Field()
    @Column()
    isPublished: boolean;
}
