import { z } from 'zod';

export const OrderValidation = z.object({
  email: z
    .string()
    .min(3, 'Email must be at least 3 characters long.')
    .max(100, 'Email must be less than 100 characters long.')
    .email('Email must be a valid email address.')
    .trim(),
  product: z
    .string()
    .min(3, 'Product name must be at least 3 characters long.')
    .max(100, 'Product name must be less than 100 characters long.')
    .trim(),
  quantity: z.number().min(1, 'Quantity must be at least 1.'),
  totalPrice: z.number().min(1, 'Total price must be at least 1.'),
});
