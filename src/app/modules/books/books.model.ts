import { Schema, model } from 'mongoose';
import { IBook } from './books.interface';


const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, 'Book title is required.'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long.'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required.'],
      trim: true,
      minlength: [3, 'Author name must be at least 3 characters long.'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, 'Price must be a positive value.'],
    },
    category: {
      type: String,
      enum: {
        values: [
          'Fiction',
          'Science',
          'SelfDevelopment',
          'Poetry',
          'Religious',
        ],
        message:
          '{VALUE} is not a valid category. Allowed values: Fiction, Science, SelfDevelopment, Poetry, Religious.',
      },
      required: [true, 'Category is required.'],
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      minlength: [10, 'Description must be at least 10 characters long.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [0, 'Quantity must be a positive value or zero.'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Stock status (inStock) is required.'],
    },
  },
  {
    timestamps: true, 
    versionKey: false, 
  },
);

// Create the Mongoose model
export const Book = model<IBook>('Book', bookSchema);
