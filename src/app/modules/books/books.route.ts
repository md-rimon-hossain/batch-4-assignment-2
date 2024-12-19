import express from 'express';
import { BookControllers } from './books.controller';

const router = express.Router();

router.post('/', BookControllers.createBook);
router.get('/', BookControllers.getAllBooks);
router.get("/:productId", BookControllers.getBookById);
router.put("/:productId", BookControllers.updateBook);
router.delete("/:productId", BookControllers.deleteBook);

export const BookRoutes = router;
