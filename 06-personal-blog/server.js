import express from 'express';
import htmlGenerator from './services/html-generator.js';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(htmlGenerator());
})

app.get('/admin', (req, res) => {
    res.send('<h1>You are now in admin area</h1>');
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})