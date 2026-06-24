import express from 'express';
import initializeStorage from './services/initialize-articles-storage.js';
import indexRouter from './routes/index.js';
import adminRouter from './routes/admin.js';

initializeStorage();

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.use('/', indexRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})