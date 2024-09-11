import express from 'express';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import item_route from './routes/item_routes.js';
import { DB } from './config/db.js';
const app = express()

const port = 5000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend's origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization , token'
}));


DB()

app.get('/' , (req , res)=>{
    res.send('Hi')
})
app.use('/api/items' , item_route)
app.use('/images' , express.static(path.join(__dirname , 'images')))

app.listen(port,()=>{
    console.log('server is on')
})
