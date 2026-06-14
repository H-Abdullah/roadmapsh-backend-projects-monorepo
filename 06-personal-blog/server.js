import express from 'express';
import htmlGenerator from './services/html-generator.js';
import formGenerator from './services/form-generator.js';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(htmlGenerator());
})

app.get('/admin', (req, res) => {
    res.send(htmlGenerator(true));
})

app.get('/admin/add', (req, res) => {
    res.send(formGenerator());
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})