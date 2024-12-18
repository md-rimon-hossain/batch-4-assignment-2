import { NextFunction, Request, Response } from 'express';
import { OrderValidation } from './orders.validation';
import { OrderServices } from './orders.service';
import { errorResponse, successResponse } from '../../utils/response';

async function createOrder(req: Request, res: Response, next: NextFunction) {
  try { 
    // checking validation using zod
    const { data, success, error } = OrderValidation.safeParse(req.body);

    if (!success) {
      return next(error);
    }

    const order = await OrderServices.createOrderIntoDB(res, data, next);

    if (!order) {
      return; 
    }

    return successResponse(res, 201, {
      message: 'Order created successfully',
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
}

async function getOrdersRevenue(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await OrderServices.getOrdersRevenueFromDB(next);

  
    if (!result || result.length === 0) {
      return errorResponse(res, 404, {
        message: 'No orders found in the database',
        success: false,
        error: {
          path: 'orders',
          message: 'No orders available',
        },
        stack: 'No stack trace is available',
      });
    }

    return successResponse(res, 200, {
      message: 'Revenue calculated successfully',
      success: true,
      data: {
        totalRevenue: result[0].totalRevenue,
      },
    });
  } catch (error) {
    next(error);
  }
}

export const OrderControllers = {
  createOrder,
  getOrdersRevenue,
};
