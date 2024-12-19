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

    // create a new book
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

    // get all books from DB using searchTerm if provided else get all books
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

async function getBookById(req: Request, res: Response, next: NextFunction) {
  try {
    // if book id is not provided then return error response with book id is required
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

    // get book by id from DB using book id
    const result = await BookServices.getBookByIdFromDB(
      req.params.productId,
      next,
    );

    // if book is not found then return error response with book not found
    if (!result) {
      return errorResponse(res, 404, {
        message: 'Book not found with this id in the database',
        success: false,
        error: {
          path: 'id',
          message: 'Book not found with this id in the database',
        },
        stack: 'No stack trace is available',
      });
    }

    return successResponse(res, 200, {
      message: 'Book retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function updateBook(req: Request, res: Response, next: NextFunction) {
  try {
    // if book id is not provided then return error response with book id is required
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

    // if book data is not provided then return error response with book data is required
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

    // if validation fails then return error response
    if (!success) {
      return next(error);
    }

    // update book in DB
    const result = await BookServices.updateBookIntoDB(
      res,
      req.params.productId,
      data,
      next,
    );

    // if book is not found then return error response
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
    // if book id is not provided then return error response with book id is required
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

    // delete book from DB using book id
    const result = await BookServices.deleteBookFromDB(
      req.params.productId,
      next,
    );

    // if book is not found then return error response
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
  getBookById
};
