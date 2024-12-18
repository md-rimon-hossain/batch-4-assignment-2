import { NextFunction, Response } from 'express';
import { IBook, IUpdateBook } from './books.interface';
import { Book } from './books.model';

async function createBookIntoDB(bookData: IBook, next: NextFunction) {
  try {
    const result = await Book.create(bookData);
    return result;
  } catch (error) {
    next(error);
  }
}

async function getAllBooksFromDB(next: NextFunction, searchTerm?: string) {
  try {
    // if searchTerm is not provided then get all books retrieved
    if (!searchTerm) {
      const result = await Book.find({});
      return result;
    }

    // for query to get all books based on searchTerm, searchTerm can be title, author, category
    const result = await Book.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { author: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    });
    return result;
  } catch (error) {
    next(error);
  }
}

async function updateBookIntoDB(
  res: Response,
  productId: string,
  bookData: IUpdateBook,
  next: NextFunction,
) {
  try {
    const result = await Book.findOneAndUpdate(
      { _id: productId },
      { ...bookData, inStock: true },
      {
        new: true,
      },
    );
    return result;
  } catch (error) {
    next(error);
  }
}

async function deleteBookFromDB(productId: string, next: NextFunction) {
  try {
    const result = await Book.findOneAndDelete({ _id: productId });

    return result;
  } catch (error) {
    next(error);
  }
}

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};
