import { Resolver, FieldResolver, Root, Query, Mutation, Arg, Ctx } from "type-graphql";
import { getRepository, Repository } from "typeorm";

import { BookInput } from './types/book-input'
import { Book } from "../entities/Book";

@Resolver(of => Book)
export class BookResolver {

    private bookRepository: Repository<Book>;

    constructor () {
        this.bookRepository = getRepository(Book)
    }

    @Query(returns => [Book])
    books(): Promise<Book[]> {
      return getRepository(Book).find();
    }

    @Mutation(returns => Book)
    async addBook(
      @Arg("book") bookInput: BookInput,
    //   @Ctx() { user }: Context,
    ): Promise<Book> {
        const book = getRepository(Book).create({
            filename: 'default/filename.txt',
            isPublished: false,
            views: 2,
            ...bookInput
        });

        return await this.bookRepository.save(book);
    }  

//   @FieldResolver()
//   async author(@Root() book: Book): Promise<Author> {
//     return getRepository(Book).find()
//     // return (await this.userRepository.findOne(rate.userId, { cache: 1000 }))!;
//   }
}
