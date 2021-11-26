"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMutation = undefined;

var _handphone = require("../models/handphone");

const PhoneMutation = {
  buatPhone: _handphone.PhoneTC.getResolver('createOne')
};
exports.PhoneMutation = PhoneMutation;