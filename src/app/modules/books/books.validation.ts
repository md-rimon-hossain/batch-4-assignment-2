import { z } from 'zod';

// Define the Zod schema for the book model
export const BookValidation = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long.')
    .max(100, 'Title must be less than 100 characters long.')
    .trim(),
  author: z
    .string()
    .min(3, 'Author name must be at least 3 characters long.')
    .max(100, 'Author name must be less than 100 characters long.')
    .trim(),
  price: z
    .number()
    .min(0, 'Price must be a positive number.'),
  category: z.enum(
    ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
    {
      errorMap: () => ({
        message: 'Category is required and must be one of the valid options.',
      }),
    },
  ),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long.')
    .max(500, 'Description must be less than 500 characters long.'),

  quantity: z
    .number()
    .min(0, 'Quantity must be a positive value or zero.'),

  inStock: z
    .boolean()
    .refine(
      (val) => typeof val === 'boolean',
      'Stock status (inStock) is required.',
    ),
});


export const BookValidationUpdate = BookValidation.partial();