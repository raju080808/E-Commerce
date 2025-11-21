import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/dbConnect';
import loginOrReg from './routes/signup';
import cart from './routes/cart.route';
import products from './routes/products.routes'
dotenv.config();
let port=process.env.PORT || 5000;
const app=express();
app.use(cors())
app.use(express.json());
connectDB();
app.use('/api',loginOrReg);
app.use('/api/cart',cart)
app.use('/api/products',products)
app.listen(5000,()=>{
    console.log(`server started at port ${port}`)
})