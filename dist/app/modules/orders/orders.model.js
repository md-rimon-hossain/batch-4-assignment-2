"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Order = (0, mongoose_1.model)('Order', exports.orderSchema);
