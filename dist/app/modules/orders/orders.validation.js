"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
exports.OrderValidation = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(3, 'Email must be at least 3 characters long.')
        .max(100, 'Email must be less than 100 characters long.')
        .email('Email must be a valid email address.')
        .trim(),
    product: zod_1.z
        .string()
        .min(3, 'Product name must be at least 3 characters long.')
        .max(100, 'Product name must be less than 100 characters long.')
        .trim(),
    quantity: zod_1.z.number().min(1, 'Quantity must be at least 1.'),
    totalPrice: zod_1.z.number().min(1, 'Total price must be at least 1.'),
});
