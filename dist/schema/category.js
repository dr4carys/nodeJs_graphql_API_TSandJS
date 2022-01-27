"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryFindById = exports.categoryCreateOne = undefined;

var _category = require("../models/category");

const categoryCreateOne = exports.categoryCreateOne = _category.CategoryTC.mongooseResolvers.createOne();

const categoryFindById = exports.categoryFindById = _category.CategoryTC.mongooseResolvers.findById();