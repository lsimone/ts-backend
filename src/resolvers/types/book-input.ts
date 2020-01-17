import { InputType, Field } from 'type-graphql'

import { Book } from "../../entities/Book";

@InputType()
export class BookInput implements Partial<Book> {
  @Field()
  name: string;

  @Field()
  description: string;
  
  @Field({ nullable: true })
  filename?: string;
}
