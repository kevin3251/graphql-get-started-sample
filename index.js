const { ApolloServer, gql } = require('apollo-server')
const { find, propEq } = require('ramda')
const bookmarks = require('./data.json')

const typeDefs = gql`
    type Item {
        title: String
        url: String
    }

    type Query {
        topic(wanted: String): [Item]
    }
`

const resolvers = {
    Query: {
        topic: (root, { wanted: topic }, context, info) => {
            let result = find(propEq('topic', topic), bookmarks) || {}
            return result.items || []
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})