import express from 'express';
import htmlGenerator from './services/html-generator.js';
import formGenerator from './services/form-generator.js';
import initializeStorage from './services/initialize-articles-storage.js';
import { saveArticle } from './services/articles-handler.js';

initializeStorage();

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', async (req, res) => {
    const html = await htmlGenerator();
    res.send(html);
})

app.get('/admin', async (req, res) => {
    const html = await htmlGenerator(true);
    res.send(html);
})

app.get('/admin/add', (req, res) => {
    res.send(formGenerator());
})

app.post('/publish-article', async (req, res) => {
    const title = req.body.articleTitle;
    const content = req.body.articleContent;

    await saveArticle(title, content);
    res.redirect('/admin');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})