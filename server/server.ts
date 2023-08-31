import express, { Express } from "express";
import { config } from "dotenv";
config();
import './database';
import user from './routes/user';
import blogs from './routes/blogs';
import cors from 'cors';

const app: Express = express();
const PORT : number = 8000;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/', (req: any, res: any) => {
    res.send('Hello World 🚀');
});

app.use('/api/users', user);
app.use('/api/blogs', blogs);

app.listen(PORT, () => {
    console.log('Successfully started server at http://localhost:8000');
})