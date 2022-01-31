"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.set('debug', true);
const connection = mongoose_1.default.connect(process.env.MONGODB_URI);
connection
    .then((db) => db)
    .catch((err) => {
    console.log(err);
});
exports.default = connection;
//# sourceMappingURL=db.js.map