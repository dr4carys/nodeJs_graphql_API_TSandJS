"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MONGO_DEBUG = exports.MONGODB_URL = undefined;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
const MONGODB_URL = exports.MONGODB_URL = process.env.MONGODB_URI;
const MONGO_DEBUG = exports.MONGO_DEBUG = true;