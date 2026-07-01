import { Router } from "express";
import articleViewGenerator from "../services/article-view-generator.js";

const router = Router();

router.get('/:slug', async (req, res) => {
    const slug = req.params.slug;
    const from = req.query.from;
    const article = await articleViewGenerator({
        from: from,
        slug: slug
    });
    res.send(article);
})

export default router;