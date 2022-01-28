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
exports.borrowBookTC = exports.borrowBook = exports.borrowBookSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
exports.borrowBookSchema = new mongoose_1.Schema({
    idUser: {
        type: String,
        ref: 'User',
        required: true,
    },
    idBook: {
        type: String,
        ref: 'Book',
        required: true,
    },
    startPinjam: {
        type: Date,
        required: true,
    },
    endPinjam: {
        type: Date,
        requited: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    pax: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.borrowBookSchema.index({ createdAt: 1, updatedAt: 1 });
exports.borrowBook = mongoose_1.default.model('borrowBook', exports.borrowBookSchema, 'borrowBook', true);
exports.borrowBookTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.borrowBook, {
    onlyFields: ['_id', 'idUser', 'idBook', 'status', 'createdAt', 'updatedAt', 'startPinjam', 'endPinjam', 'pax'],
});
//# sourceMappingURL=borrowBook.js.map