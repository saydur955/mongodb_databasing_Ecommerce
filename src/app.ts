import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';

// routes
import { orderRouter } from './router/orderRouter';

// dev routes
import { userRouter as userDevRouter } from './routesDEV/userRoute';
import { productRouter as productDevRouter } from './routesDEV/productRoute';
import { orderRouter as orderDevRouter } from './routesDEV/orderRoute';

const app = express();

// ========== set middlewares


app.use(express.json({ limit: '50kb' }));
// sanitize 
app.use(mongoSanitize())

app.use('/orders', orderRouter);

app.use('/devUsers', userDevRouter);
app.use('/devProducts', productDevRouter);
app.use('/devOrders', orderDevRouter);

export { app };