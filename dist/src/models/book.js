"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookTC = exports.Book = exports.bookSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.bookSchema = new mongoose_1.Schema({
    bookTitle: {
        type: String,
        required: true,
    },
    pax: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        ref: 'Category',
        required: true,
    },
}, {
    timestamps: true,
});
exports.bookSchema.index({ createdAt: 1, updatedAt: 1 });
exports.Book = mongoose_1.default.model('Book', exports.bookSchema, 'books', true);
exports.BookTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.Book, {
    onlyFields: ['_id', 'bookTitle', 'pax'],
});
//# sourceMappingURL=book.js.map