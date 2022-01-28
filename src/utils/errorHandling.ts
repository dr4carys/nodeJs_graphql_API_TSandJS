import { errType } from './errorConstant';

const getErrorCode = (errorName: any) => {
  return errType[errorName];
};

module.exports = getErrorCode;
