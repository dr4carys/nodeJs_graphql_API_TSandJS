"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlSchema = void 0;
const graphql_compose_1 = require("graphql-compose");
const user_1 = require("./user");
const category_1 = require("./category");
const book_1 = require("./book");
const borrowBook_1 = require("./borrowBook");
graphql_compose_1.schemaComposer.Query.addFields({
    userFindById: user_1.userFindById,
    userConnection: user_1.userConnection,
    bookFindById: book_1.bookFindById,
    bookFindMany: book_1.bookFindMany,
    categoryFindById: category_1.categoryFindById,
    borrowBookConnection: borrowBook_1.borrowBookConnection,
    borrowBookFindById: borrowBook_1.borrowBookFindById,
});
graphql_compose_1.schemaComposer.Mutation.addFields({
    rentBook: borrowBook_1.rentBook,
    returnBook: borrowBook_1.returnBook,
    userCreateOne: user_1.userCreateOne,
    userUpdateById: user_1.userUpdateById,
    bookCreateOne: book_1.bookCreateOne,
    bookUpdateById: book_1.bookUpdateById,
    categoryCreateOne: category_1.categoryCreateOne,
});
exports.graphqlSchema = graphql_compose_1.schemaComposer.buildSchema();
//# sourceMappingURL=index.js.map