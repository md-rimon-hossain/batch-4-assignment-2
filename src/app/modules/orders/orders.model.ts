import { model, Schema } from 'mongoose';
import { IOrder } from './orders.interface';

export const orderSchema = new Schema<IOrder>(
  {
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
  },
  {
    timestamps: true,
  },
);

export const Order = model<IOrder>('Order', orderSchema);
