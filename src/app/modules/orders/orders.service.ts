import { NextFunction, Response } from 'express';
import { Order } from './orders.model';
import { IOrder } from './orders.interface';
import { Book } from '../books/books.model';
import { errorResponse } from '../../utils/response';

// create order
async function createOrderIntoDB(
  res: Response,
  orderData: IOrder,
  next: NextFunction,
) {
  try {

    // find product by id from DB
    const isProductExist = await Book.findOne({ _id: orderData.product });

    // if product is not found then return error response
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

    // if product is found but is out of stock then return error response - Product is out of stock
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

      // if product quantity is less than order quantity then return error response - Insufficient product quantity
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

      // if product quantity is greater than order quantity then create order 
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

// get orders revenue
async function getOrdersRevenueFromDB(next: NextFunction) {
  try {
    // get orders revenue from DB using aggregation pipeline (this will calculate total revenue of all orders)
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { 
            $sum: "$totalPrice" 
          },
        },
      },
    ]);
    
    // if result is empty then return 0
    return result.length > 0 ? result[0].totalRevenue  : 0;
  } catch (error) {
    next(error);
  }
}


export const OrderServices = {
  createOrderIntoDB,
  getOrdersRevenueFromDB,
};
