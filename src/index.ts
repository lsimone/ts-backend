import { ApolloServer, gql } from 'apollo-server'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import CFG from 'services/cfg'
import { Book } from './entities/Book'
import { buildSchema } from 'type-graphql'

import { BookResolver } from './resolvers/book-resolver'

const SYNCHRONIZE_DB = true

const bootstrap = async () => {
    console.warn('YO', CFG)

    const connection = await createConnection({
        type: 'mysql',
        ...CFG.DB,
        synchronize: SYNCHRONIZE_DB,
        entities: [Book]
    })

    const schema = await buildSchema({
      resolvers: [BookResolver]
    })

    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    // const server = new ApolloServer({ typeDefs, resolvers })
    const server = new ApolloServer({ schema })

    // The `listen` method launches a web server.
    const { url } = await server.listen()
    console.log(`🚀  Server ready at ${url}`)
}

bootstrap()
