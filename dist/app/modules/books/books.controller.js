"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookControllers = void 0;
const books_service_1 = require("./books.service");
const books_validation_1 = require("./books.validation");
const response_1 = require("../../utils/response");
function createBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // checking validation using zod
            const { data, success, error } = books_validation_1.BookValidation.safeParse(req.body);
            if (!success) {
                return next(error);
            }
            const result = yield books_service_1.BookServices.createBookIntoDB(data, next);
            return (0, response_1.successResponse)(res, 201, {
                message: 'Book created successfully',
                success: true,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function getAllBooks(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { searchTerm } = req.query;
            const result = yield books_service_1.BookServices.getAllBooksFromDB(next, searchTerm);
            return (0, response_1.successResponse)(res, 200, {
                message: 'Books retrieved successfully',
                success: true,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function updateBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.productId) {
                (0, response_1.errorResponse)(res, 400, {
                    message: 'Book id is required',
                    success: false,
                    error: {
                        path: 'id',
                        message: 'Book id is required',
                    },
                    stack: 'No stack trace is available',
                });
            }
            if (!req.body) {
                (0, response_1.errorResponse)(res, 400, {
                    message: 'Book data is required',
                    success: false,
                    error: {
                        path: 'body',
                        message: 'Book data is required',
                    },
                    stack: 'No stack trace is available',
                });
            }
            // checking validation using zod
            const { data, success, error } = books_validation_1.BookValidationUpdate.safeParse(req.body);
            if (!success) {
                return next(error);
            }
            const result = yield books_service_1.BookServices.updateBookIntoDB(res, req.params.productId, data, next);
            if (!result) {
                return (0, response_1.errorResponse)(res, 404, {
                    message: 'Book not found with this id to update in the database',
                    success: false,
                    error: {
                        path: 'id',
                        message: 'Book not found',
                    },
                    stack: 'No stack trace is available',
                });
            }
            return (0, response_1.successResponse)(res, 200, {
                message: 'Book updated successfully',
                success: true,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.productId) {
                (0, response_1.errorResponse)(res, 400, {
                    message: 'Book id is required to delete book',
                    success: false,
                    error: {
                        path: 'id',
                        message: 'Book id is required',
                    },
                    stack: 'No stack trace is available',
                });
            }
            const result = yield books_service_1.BookServices.deleteBookFromDB(req.params.productId, next);
            if (!result) {
                return (0, response_1.errorResponse)(res, 404, {
                    message: 'Book not found with this id to delete in the database',
                    success: false,
                    error: {
                        path: 'id',
                        message: 'Book not found',
                    },
                    stack: 'No stack trace is available',
                });
            }
            return (0, response_1.successResponse)(res, 200, {
                message: 'Book deleted successfully',
                success: true,
                data: {},
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.BookControllers = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook,
};
