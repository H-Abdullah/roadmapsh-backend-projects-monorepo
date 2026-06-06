import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})