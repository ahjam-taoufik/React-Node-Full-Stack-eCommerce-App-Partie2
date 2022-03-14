const express=require('express');
const app = express();
const mongoose=require('mongoose'); 
const dotenv=require('dotenv');
const useRouter=require('./routes/user')
const authRouter=require('./routes/auth')
dotenv.config()


mongoose.connect(
    process.env.MONGO_URL    
    )
    .then(()=> console.log('DBConnection Successfull!'))
    .catch((err)=>console.error('DBConnection Failed'))
    
    
    
app.use(express.json())
app.use("/api/user",useRouter);
app.use("/api/auth",authRouter);


app.listen(process.env.PORT || 5000, ()=>{
    console.log('====================================');
    console.log('Backend server is running!');
    console.log('====================================');
})