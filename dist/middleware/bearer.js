"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bearer;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _jsonwebtoken = require("jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bearer(req) {
  console.log('SSSSSSSSSSSSSSSSSSSSSSSSSS');
  console.log(req.headers.authorization);
}