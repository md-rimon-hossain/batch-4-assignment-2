import express from 'express';
import { OrderControllers } from './orders.controller';

const router = express.Router();

router.post('/', OrderControllers.createOrder);
router.get('/revenue', OrderControllers.getOrdersRevenue);




export const OrderRoutes = router;