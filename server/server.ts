import express, { Express } from "express";
import { config } from "dotenv";
config();
import './database';
import user from './routes/user';
import blogs from './routes/blogs';
import cors from 'cors';
import path from "path";

const app: Express = express();
const PORT : number = 8000;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
    app.get('/', (req: any, res: any) => {
        res.send('API running successfully');
    });
} else {
    app.use(express.static(path.join(path.resolve(), '../client/dist')));
    app.get('*', (req: any, res: any) => {
        res.sendFile(path.resolve(path.resolve(), "../client/dist/index.html"));
    })
}


app.use('/api/users', user);
app.use('/api/blogs', blogs);

app.listen(PORT, () => {
    console.log('Successfully started server at http://localhost:8000');
})