"use strict";

var _errorConstant = require("./errorConstant");

const getErrorCode = errorName => {
  return _errorConstant.errorType[errorName];
};

module.exports = getErrorCode;