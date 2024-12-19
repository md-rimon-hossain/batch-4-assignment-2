"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const books_route_1 = require("./app/modules/books/books.route");
const orders_route_1 = require("./app/modules/orders/orders.route");
const zod_1 = require("zod");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/api/products', books_route_1.BookRoutes);
app.use('/api/orders', orders_route_1.OrderRoutes);
//handle errors  for all invalid routes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.all('*', (req, res, next) => {
    res.status(404).send({
        message: 'Resource not found.',
        success: false,
        error: {
            name: 'RouteNotFound',
            errors: {},
        },
        stack: 'No stack trace is available',
    });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    // Handle Zod validation errors
    if (err instanceof zod_1.ZodError) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const zodErrors = err.errors.reduce((acc, e) => {
            acc[e.path.join('.')] = {
                message: e.message,
                name: 'ValidatorError',
                properties: {
                    message: e.message,
                    type: e.code, // 'too_small', 'invalid_type'
                    min: e.minimum,
                },
                kind: e.code,
                path: e.path.join('.'), // Path of the field that failed validation
                value: req.body[e.path[0]], // Using the actual value from the request body
            };
            return acc;
        }, {});
        res.status(400).json({
            message: 'Validation failed',
            success: false,
            error: {
                name: 'ValidationError',
                errors: zodErrors,
            },
            stack: err.stack || 'No stack trace is available',
        });
        return;
    }
    // Generic error handler for other errors or Internal Server Error
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        success: false,
        error: {
            name: err.name || 'Error',
        },
        stack: err.stack || 'No stack trace is available',
    });
    return;
});
exports.default = app;
