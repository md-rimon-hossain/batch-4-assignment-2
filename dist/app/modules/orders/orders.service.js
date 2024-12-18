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
exports.OrderServices = void 0;
const orders_model_1 = require("./orders.model");
const books_model_1 = require("../books/books.model");
const response_1 = require("../../utils/response");
function createOrderIntoDB(res, orderData, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isProductExist = yield books_model_1.Book.findOne({ _id: orderData.product });
            if (!isProductExist) {
                return (0, response_1.errorResponse)(res, 404, {
                    message: 'Product Not Found to create order',
                    success: false,
                    error: {
                        path: 'product',
                        message: 'Product not found',
                    },
                    stack: 'No stack trace is available',
                });
            }
            if (isProductExist) {
                if (isProductExist.inStock === false) {
                    return (0, response_1.errorResponse)(res, 400, {
                        message: 'Product is out of stock to create the order.',
                        success: false,
                        error: {
                            path: 'inStock',
                            message: 'Product is out of stock',
                        },
                        stack: 'No stack trace is available',
                    });
                }
                if (isProductExist.quantity < orderData.quantity) {
                    return (0, response_1.errorResponse)(res, 400, {
                        message: 'Insufficient product quantity to create the order.',
                        success: false,
                        error: {
                            path: 'quantity',
                            message: `Only ${isProductExist.quantity} quantity are available for purchase, but you requested ${orderData.quantity} quantity.`,
                        },
                        stack: 'No stack trace is available',
                    });
                }
                const order = yield orders_model_1.Order.create(orderData);
                if (!order) {
                    return (0, response_1.errorResponse)(res, 500, {
                        message: 'Failed to create order.',
                        success: false,
                        error: {
                            path: 'order',
                            message: 'Failed to create order.',
                        },
                        stack: 'No stack trace is available',
                    });
                }
                const updatedQuantity = isProductExist.quantity - orderData.quantity;
                isProductExist.quantity = updatedQuantity;
                isProductExist.inStock = isProductExist.quantity > 0;
                yield isProductExist.save();
                return order;
            }
        }
        catch (error) {
            next(error);
        }
    });
}
function getOrdersRevenueFromDB(next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield orders_model_1.Order.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$totalPrice' },
                    },
                },
            ]);
            return result;
        }
        catch (error) {
            next(error);
        }
    });
}
exports.OrderServices = {
    createOrderIntoDB,
    getOrdersRevenueFromDB,
};
