"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_DEBUG = exports.MONGODB_URL = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.MONGODB_URL = process.env.MONGODB_URI;
exports.MONGO_DEBUG = true;
//# sourceMappingURL=config.js.map