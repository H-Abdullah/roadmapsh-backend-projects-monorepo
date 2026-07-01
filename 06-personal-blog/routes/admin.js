import { Router } from "express";
import htmlGenerator from "../services/html-generator.js";
import formGenerator from "../services/form-generator.js";
import { deleteArticle, editArticle, extractArticleData, saveArticle } from "../services/articles-handler.js";

const router = Router();

// =============== '/admin' route ===============
router.get('/', async (req, res) => {
    const html = await htmlGenerator({
        isAdmin: true
    });

    res.send(html);
})

// =============== add new article routes ===============
router.get('/article/new', (req, res) => {
    res.send(formGenerator({ 
        formTitle: 'Add new article',
        action: '/admin/article/publish'}));
})

router.post('/article/publish', async (req, res) => {
    const title = req.body.articleTitle;
    const content = req.body.articleContent;

    const sanitizedContent = sanitize
    await saveArticle({ 
        title, 
        content 
    });
    res.redirect('/admin');
});

// =============== edit article routes ===============
// routes for editing article 
router.get('/article/:id/edit', async (req, res) => {
    const id = Number(req.params.id);
    console.log('id:', id);
    const { title, content } = await extractArticleData(id);
    console.log(`title: ${title}, content: ${content}`)
    res.send(formGenerator({ 
        formTitle: 'Edit current article',
        action: `/admin/article/${id}/edit`,
        title: title,
        content: content}));
})

router.post('/article/:id/edit', async (req, res) => {
    const id = Number(req.params.id);
    const title = req.body.articleTitle;
    const content = req.body.articleContent;
    await editArticle({
        id: id,
        title: title,
        content: content
    });

    res.redirect('/admin');
})

// =============== delete article route ===============
router.get('/article/:id/delete', async (req, res) => {
    const id = Number(req.params.id);
    await deleteArticle(id);
    res.redirect('/admin');
})

export default router;