import { NextFunction, Request, Response } from 'express';
import { BookServices } from './books.service';
import { BookValidation, BookValidationUpdate } from './books.validation';
import { errorResponse, successResponse } from '../../utils/response';

async function createBook(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // checking validation using zod
    const { data, success, error } = BookValidation.safeParse(req.body);

    if (!success) {
      return next(error);
    }

    const result = await BookServices.createBookIntoDB(data, next);

    return successResponse(res, 201, {
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllBooks(req: Request, res: Response, next: NextFunction) {
  try {
    const { searchTerm } = req.query;

    const result = await BookServices.getAllBooksFromDB(
      next,
      searchTerm as string,
    );

    return successResponse(res, 200, {
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function updateBook(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.params.productId) {
      errorResponse(res, 400, {
        message: 'Book id is required',
        success: false,
        error: {
          path: 'id',
          message: 'Book id is required',
        },
        stack: 'No stack trace is available',
      });
    }

    if (!req.body) {
      errorResponse(res, 400, {
        message: 'Book data is required',
        success: false,
        error: {
          path: 'body',
          message: 'Book data is required',
        },
        stack: 'No stack trace is available',
      });
    }

    // checking validation using zod
    const { data, success, error } = BookValidationUpdate.safeParse(req.body);

    if (!success) {
      return next(error);
    }

    const result = await BookServices.updateBookIntoDB(res,
      req.params.productId,
      data,
      next,
    );

    if (!result) {
      return errorResponse(res, 404, {
        message: 'Book not found with this id to update in the database',
        success: false,
        error: {
          path: 'id',
          message: 'Book not found',
        },
        stack: 'No stack trace is available',
      });
    }

    return successResponse(res, 200, {
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteBook(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.params.productId) {
      errorResponse(res, 400, {
        message: 'Book id is required to delete book',
        success: false,
        error: {
          path: 'id',
          message: 'Book id is required',
        },
        stack: 'No stack trace is available',
      });
    }

    const result = await BookServices.deleteBookFromDB(
      req.params.productId,
      next,
    );

    if (!result) {
      return errorResponse(res, 404, {
        message: 'Book not found with this id to delete in the database',
        success: false,
        error: {
          path: 'id',
          message: 'Book not found',
        },
        stack: 'No stack trace is available',
      });
    }

    return successResponse(res, 200, {
      message: 'Book deleted successfully',
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
}

export const BookControllers = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
};
