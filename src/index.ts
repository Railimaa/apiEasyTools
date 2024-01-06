import 'dotenv/config';

import path from 'node:path';

import express from 'express';

import { cors } from './middlewares/cors';
import { router } from './router';

const app = express();
const port = 3001;

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(express.json());
app.use(cors);
app.use(router);

app.listen(port, () => console.log('🥵 Server is running in http://localhost:3001'));
