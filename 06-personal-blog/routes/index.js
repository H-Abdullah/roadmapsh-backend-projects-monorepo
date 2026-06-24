import { Router } from "express";
import htmlGenerator from "../services/html-generator.js";

const router = Router();

router.get('/', async (req, res) => {
    const html = await htmlGenerator({
        isAdmin: false
    });
    
    res.send(html);
})

export default router;
