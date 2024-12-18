/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import express, {  Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { BookRoutes } from './app/modules/books/books.route';
import { OrderRoutes } from './app/modules/orders/orders.route';
import { ZodError } from 'zod';

const app : Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/products', BookRoutes);
app.use('/api/orders', OrderRoutes);

//handle errors  for all invalid routes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.all('*', (req: Request, res: Response, next: NextFunction) => {
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
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const zodErrors = err.errors.reduce((acc: any, e: any) => {
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

  // Generic error handler for other errors
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

export default app;
