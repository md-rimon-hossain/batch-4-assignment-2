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
exports.OrderControllers = void 0;
const orders_validation_1 = require("./orders.validation");
const orders_service_1 = require("./orders.service");
const response_1 = require("../../utils/response");
function createOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // checking validation using zod
            const { data, success, error } = orders_validation_1.OrderValidation.safeParse(req.body);
            if (!success) {
                return next(error);
            }
            const order = yield orders_service_1.OrderServices.createOrderIntoDB(res, data, next);
            if (!order) {
                return;
            }
            return (0, response_1.successResponse)(res, 201, {
                message: 'Order created successfully',
                success: true,
                data: order,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function getOrdersRevenue(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield orders_service_1.OrderServices.getOrdersRevenueFromDB(next);
            if (!result || result.length === 0) {
                return (0, response_1.errorResponse)(res, 404, {
                    message: 'No orders found in the database',
                    success: false,
                    error: {
                        path: 'orders',
                        message: 'No orders available',
                    },
                    stack: 'No stack trace is available',
                });
            }
            return (0, response_1.successResponse)(res, 200, {
                message: 'Revenue calculated successfully',
                success: true,
                data: {
                    totalRevenue: result[0].totalRevenue,
                },
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.OrderControllers = {
    createOrder,
    getOrdersRevenue,
};
