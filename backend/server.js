// const express = require('express');
// const dotenv = require('dotenv');
// const products = require('./data/products');

import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import connectDB from './config/db.js';
// import products from './data/products.js';

import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (request, response) => {
  response.send('API is running...');
});

app.use('/api/products', productRoutes);

// app.get('/api/products', (request, response) => {
//   response.json(products);
// });

// app.get('/api/products/:id', (request, response) => {
//   const product = products.find((p) => p._id === request.params.id);
//   response.json(product);
// });

// Custom middleware for error handling: lecture 24.
app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
