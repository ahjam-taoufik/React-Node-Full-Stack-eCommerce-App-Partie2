const express=require('express');
const app = express();

const mongoose=require('mongoose'); 
const dotenv=require('dotenv');


const authRouter=require('./routes/auth')
const useRouter=require('./routes/user')
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config()

mongoose.connect(
    process.env.MONGO_URL    
    )
    .then(()=> console.log('DBConnection Successfull!'))
    .catch((err)=>console.error('DBConnection Failed'))
    


app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  })); 
app.use(express.json())  
app.use("/api/user",useRouter);
app.use("/api/auth",authRouter); 
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log('====================================');
    console.log('Backend server is running!');
    console.log('====================================');
})