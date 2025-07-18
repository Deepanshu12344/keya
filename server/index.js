import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use();

mongoose.connect()
.then(()=>{
    app.listen(PORT, (request, response) => {
        console.log(`server running on port ${PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})