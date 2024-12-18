import { NextFunction, Response } from 'express';
import { Order } from './orders.model';
import { IOrder } from './orders.interface';
import { Book } from '../books/books.model';
import { errorResponse } from '../../utils/response';

async function createOrderIntoDB(
  res: Response,
  orderData: IOrder,
  next: NextFunction,
) {
  try {
    const isProductExist = await Book.findOne({ _id: orderData.product });
    if (!isProductExist) {
      return errorResponse(res, 404, {
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
        return errorResponse(res, 400, {
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
        return errorResponse(res, 400, {
          message: 'Insufficient product quantity to create the order.',
          success: false,
          error: {
            path: 'quantity',
            message: `Only ${isProductExist.quantity} quantity are available for purchase, but you requested ${orderData.quantity} quantity.`,
          },
          stack: 'No stack trace is available',
        });
      }

      const order = await Order.create(orderData);
      if (!order) {
        return errorResponse(res, 500, {
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
      await isProductExist.save();
      
      return order;
      }
  } catch (error) {
    next(error);
  }
}

async function getOrdersRevenueFromDB(next: NextFunction) {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);
    return result;
  } catch (error) {
    next(error);
  }
}

export const OrderServices = {
  createOrderIntoDB,
  getOrdersRevenueFromDB,
};
