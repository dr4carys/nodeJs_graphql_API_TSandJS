"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorConstant_1 = require("./errorConstant");
const getErrorCode = (errorName) => {
    return errorConstant_1.errType[errorName];
};
module.exports = getErrorCode;
//# sourceMappingURL=errorHandling.js.map