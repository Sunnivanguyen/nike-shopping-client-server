/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const express = require('express');

const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
//const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const cors = require('cors');

// const AppError = require('./src/utils/appError');

const globalErrorHandler = require('./src/controllers/errorController');

const authRouter = require('./src/routes/authRoutes');
const userRouter = require('./src/routes/userRoutes');
const adminRouter = require('./src/routes/adminRoutes');
const productRouter = require('./src/routes/productRoutes');
const categoryRouter = require('./src/routes/categoryRoutes');
const sizeRouter = require('./src/routes/sizeRoutes');
const paymentRouter = require('./src/routes/paymentRoutes');

// Start express app
const app = express();

const AdminEntity = require('./src/entities/adminEntity');
const UserEntity = require('./src/entities/userEntity');
const AdminAddressEntity = require('./src/entities/adminAddressEntity');
const UserAddressEntity = require('./src/entities/userAddressEntity');
const FavoriteEntity = require('./src/entities/favoriteEntity');
const CartItemEntity = require('./src/entities/cartItemEntity');
const ProductEntity = require('./src/entities/productEntity');
const ProductReviewEntity = require('./src/entities/productReviewEntity');
const SizeEntity = require('./src/entities/sizeEntity');
const ProductSizeEntity = require('./src/entities/productSizeEntity');
const ProductDetailEntity = require('./src/entities/productDetailEntity');
const ProductHighlightEntity = require('./src/entities/productHighlightEntity');
const ProductImageEntity = require('./src/entities/productImageEntity');
const CategoryEntity = require('./src/entities/categoryEntity');
const OrderEntity = require('./src/entities/orderEntity');
const OrderDetailEntity = require('./src/entities/orderDetailEntity');
const OrderPaymentEntity = require('./src/entities/orderPaymentEntity');
const UserPaymentEntity = require('./src/entities/userPaymentEntity');
const PaymentMethodEntity = require('./src/entities/paymentMethodEntity');
const PromotionEntity = require('./src/entities/promotionEntity');

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
app.options('*', cors());
app.use(
  cors({
    credentials: true,
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionSuccessStatus: 200,
  }),
);

// // Serving static files
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(
//   '/api/v1/user/avatar',
//   express.static(path.join(__dirname, 'src/public/img/users')),
// );

// app.use(
//   '/api/v1/admin/avatar',
//   express.static(path.join(__dirname, 'src/public/img/admins')),
// );

// app.use(
//   '/api/v1/product/image',
//   express.static(path.join(__dirname, 'src/public/img/products')),
// );

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!',
// });
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// AdminEntity.sync().then(() => {
//   console.log('Admin sync successfylly');
// });

// UserEntity.sync().then(() => {
//   console.log('User sync successfully');
// });

// AdminAddressEntity.sync().then(() => {
//   console.log('Admin Address Sync');
// });

// UserAddressEntity.sync().then(() => {
//   console.log('User Address sync successfully');
// });

// FavoriteEntity.sync().then(() => {
//   console.log('Favorite sync successfully');
// });

// CartItemEntity.sync().then(() => {
//   console.log('Cart Item sync successfully');
// });

// CategoryEntity.sync().then(() => {
//   console.log('Category sync successfully');
// });

// ProductEntity.sync().then(() => {
//   console.log('Product sync successfully');
// });

// ProductReviewEntity.sync().then(() => {
//   console.log('Product Reviews sync successfully');
// });

// SizeEntity.sync().then(() => {
//   console.log('Size sync successfully');
// });

// ProductSizeEntity.sync().then(() => {
//   console.log('Product Size sync successfully');
// });

// ProductDetailEntity.sync().then(() => {
//   console.log('Product Detail sync successfully');
// });

// ProductHighlightEntity.sync().then(() => {
//   console.log('Product Highlight sync successfully');
// });

// ProductImageEntity.sync().then(() => {
//   console.log('Product Image sync successfully');
// });

// OrderEntity.sync().then(() => {
//   console.log('Order sync successfully');
// });

// OrderDetailEntity.sync().then(() => {
//   console.log('Order Detail sync successfully');
// });

// OrderPaymentEntity.sync().then(() => {
//   console.log('Payment sync successfully');
// });

// UserPaymentEntity.sync().then(() => {
//   console.log('User Account sync successfully');
// });

// PaymentMethodEntity.sync().then(() => {
//   console.log('Payment Method sync successfully');
// });

// PromotionEntity.sync().then(() => {
//   console.log('Promotion sync successfully');
// });

//ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/sizes', sizeRouter);
app.use('/api/v1/payments', paymentRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

module.exports = app;
