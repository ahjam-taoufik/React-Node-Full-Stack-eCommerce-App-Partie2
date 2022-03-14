const express=require('express');
const app = express();

const mongoose=require('mongoose'); 
const dotenv=require('dotenv');


const authRouter=require('./routes/auth')
const useRouter=require('./routes/user')
const productRoute = require("./routes/product");

dotenv.config()

mongoose.connect(
    process.env.MONGO_URL    
    )
    .then(()=> console.log('DBConnection Successfull!'))
    .catch((err)=>console.error('DBConnection Failed'))
    
    
    
app.use(express.json())  
app.use("/api/user",useRouter);
app.use("/api/auth",authRouter); 
app.use("/api/products", productRoute);


app.listen(process.env.PORT || 5000, ()=>{
    console.log('====================================');
    console.log('Backend server is running!');
    console.log('====================================');
})