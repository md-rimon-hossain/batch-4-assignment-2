"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
// All success Response will be handled by this function
const successResponse = (res, statusCode, options) => {
    res.status(statusCode).json(options);
};
exports.successResponse = successResponse;
// All controller and services error  Response will be handled by this function
const errorResponse = (res, statusCode, options) => {
    res.status(statusCode).json(options);
};
exports.errorResponse = errorResponse;
