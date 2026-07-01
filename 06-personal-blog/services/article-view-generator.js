import escapeHTML from "../utils/escape-html.js";
import { extractArticleData, extractArticleDataUsingSlug } from "./articles-handler.js"

export default async function articleViewGenerator({
    from = '',
    slug = ''
} = {}){

    let isAdmin = false;

    if (from === 'admin') {
        isAdmin = true;
    } else {
        isAdmin = false;
    }

    const backBtn = isAdmin ? '/admin' : '/'; 
    const { title, content } = await extractArticleDataUsingSlug(slug);
 
    return (`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script type="module" src="main.js" defer></script>
            <link rel="stylesheet" href="/css/reset.css">
            <link rel="stylesheet" href="/css/global.css">
            <link rel="stylesheet" href="/css/article.css">
            <title>Personal Blog</title>
        </head>
        <body>
            <div class="main">
                <div>
                    <nav>
                        <div class='back-btn'>
                            <a href='${backBtn}'>Back</a>
                        </div>
                    </nav>
                    <div class='title'>
                        <h1>${escapeHTML(title)}</h1>
                    </div>
                    <hr>
                    <div class='content'>
                        <p>
                            ${escapeHTML(content)}
                        </p>
                    </div>
                </div>
            </div>
        </body>
    `)
}