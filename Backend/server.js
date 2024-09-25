import express from 'express';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import item_route from './routes/item_routes.js';
import user_routes from './routes/user_routes.js';
import { DB } from './config/db.js';
import { WTC_DECR } from './middlewares/WBThandler.js';
const app = express()
import dotenv from 'dotenv';
dotenv.config();
const port = 5000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend's origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization , token , inr_token ,  UP_token'
}));


DB()

app.get('/' , (req , res)=>{
    res.send('Hi')
})
app.use('/api/items' , item_route)
app.use('/api/user' , user_routes)
app.use('/item_images' , express.static(path.join(__dirname , 'item_images')))
app.use('/user_images' ,  express.static(path.join(__dirname , 'user_images')))

app.listen(port,()=>{
    console.log('server is on')
})
