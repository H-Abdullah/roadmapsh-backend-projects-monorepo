import express from 'express';
import converterUnit from './routes/converter-routes';

const app = express();
const PORT = 3000;

app.use(express.static('./public'));
// if you send data using json, use this
app.use(express.json());
// if you send data using form + submit button html tag, use this 
app.use(express.urlencoded({ extended: true }));
// registering routes on '/'
app.use('/', converterUnit);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})
