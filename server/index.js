import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import cartRoutes from './routes/cart.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    response.send("Working!!!");
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/user', cartRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, (request, response) => {
        console.log(`server running on port ${PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})