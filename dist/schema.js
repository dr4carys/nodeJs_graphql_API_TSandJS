"use strict";

const {
  gql
} = require('apollo-server-express');

module.exports = gql`
    type Book {
        id: ID!
        title: String!
        author: String!
    }
    type Laptop {
        id: ID!
        merk: String!
        tahun_buat: String!
        model_buat: String!
    }
    type Query {
        hello: String
        books: [Book]
        testbram: String
        findLaptop(merk: String!): [Laptop]
    }
    type Mutation {
        addBook(title: String!, author: String!): Book!
        addLaptop(
            merk: String!
            tahun_buat: String!
            model_buat: String!
        ): Laptop!
    }
`;