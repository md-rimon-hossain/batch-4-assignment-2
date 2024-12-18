import { Response } from 'express';

type ISuccessResponse = {
  message: string;
  success: true;
  data: unknown;
};

type IErrorResponse = {
  message: string;
  success?: false;
  error:
    | unknown
    | {
        name: string;
        message: string;
        errors: unknown;
      };
  stack: string | 'No stack available';
};

// All success Response will be handled by this function
const successResponse = (
  res: Response,
  statusCode: number,
  options: ISuccessResponse,
) => {
  res.status(statusCode).json(options);
};

// All controller and services error  Response will be handled by this function
const errorResponse = (
  res: Response,
  statusCode: number,
  options: IErrorResponse,
) => {
  res.status(statusCode).json(options);
};

export { successResponse, errorResponse };
