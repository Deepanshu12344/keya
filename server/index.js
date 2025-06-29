import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js'

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
dotenv.config();

app.use('/api', authRouter);

mongoose.connect(process.env.MONGOURL)
.then(()=>{
    app.listen(PORT,(request, response)=>{
        console.log(`server running on port ${PORT}`);
    })
}).catch((err)=>{
    console.log(err);
})