import express from 'express';
import generateTemplateFor from './services/html-generator.js';

const app = express();
const PORT = 3000;

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send(generateTemplateFor());
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})