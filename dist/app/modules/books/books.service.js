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
exports.BookServices = void 0;
const books_model_1 = require("./books.model");
function createBookIntoDB(bookData, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield books_model_1.Book.create(bookData);
            return result;
        }
        catch (error) {
            next(error);
        }
    });
}
function getAllBooksFromDB(next, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // if searchTerm is not provided then get all books retrieved
            if (!searchTerm) {
                const result = yield books_model_1.Book.find({});
                return result;
            }
            // for query to get all books based on searchTerm, searchTerm can be title, author, category
            const result = yield books_model_1.Book.find({
                $or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { author: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } },
                ],
            });
            return result;
        }
        catch (error) {
            next(error);
        }
    });
}
function updateBookIntoDB(res, productId, bookData, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield books_model_1.Book.findOneAndUpdate({ _id: productId }, Object.assign(Object.assign({}, bookData), { inStock: true }), {
                new: true,
            });
            return result;
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteBookFromDB(productId, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield books_model_1.Book.findOneAndDelete({ _id: productId });
            return result;
        }
        catch (error) {
            next(error);
        }
    });
}
exports.BookServices = {
    createBookIntoDB,
    getAllBooksFromDB,
    updateBookIntoDB,
    deleteBookFromDB,
};
