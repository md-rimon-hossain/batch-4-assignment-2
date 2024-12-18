"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidationUpdate = exports.BookValidation = void 0;
const zod_1 = require("zod");
// Define the Zod schema for the book model
exports.BookValidation = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, 'Title must be at least 3 characters long.')
        .max(100, 'Title must be less than 100 characters long.')
        .trim(),
    author: zod_1.z
        .string()
        .min(3, 'Author name must be at least 3 characters long.')
        .max(100, 'Author name must be less than 100 characters long.')
        .trim(),
    price: zod_1.z
        .number()
        .min(0, 'Price must be a positive number.'),
    category: zod_1.z.enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'], {
        errorMap: () => ({
            message: 'Category is required and must be one of the valid options.',
        }),
    }),
    description: zod_1.z
        .string()
        .min(10, 'Description must be at least 10 characters long.')
        .max(500, 'Description must be less than 500 characters long.'),
    quantity: zod_1.z
        .number()
        .min(0, 'Quantity must be a positive value or zero.'),
    inStock: zod_1.z
        .boolean()
        .refine((val) => typeof val === 'boolean', 'Stock status (inStock) is required.'),
});
exports.BookValidationUpdate = exports.BookValidation.partial();
