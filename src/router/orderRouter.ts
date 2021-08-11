import { Router } from 'express';
import { calculateOrderAmount } from '../controller/order/01_calculateOrderAmount';

const router = Router();

router.route('/validateOrder/:orderId').patch(calculateOrderAmount)

export const orderRouter = router;