"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryFindById = exports.categoryCreateOne = void 0;
const category_1 = require("../models/category");
exports.categoryCreateOne = category_1.CategoryTC.mongooseResolvers.createOne();
exports.categoryFindById = category_1.CategoryTC.mongooseResolvers.findById();
//# sourceMappingURL=category.js.map