import { readJSON } from "./articles-handler.js";

function adminCSS(isAdmin) {
    return isAdmin
    ? '<link rel="stylesheet" href="/css/admin.css">'
    : '';
}

function adminGreeting(isAdmin) {
    return isAdmin
    ? '<p>Welcome User</p>'
    : '<a class="login-btn" href="/admin">login</a>';
}

function adminNewArticleBtn(isAdmin) {
    return isAdmin
    ? ` <div class="add-new-article-btn">
            <a href="/admin/add">Add new article</a>
        </div>`
    : '';
}

function adminArticle(isAdmin, title, date) {
    return isAdmin
    ? ` <div class='article-container'> 
            <div class="article">
                <div class="article-name">
                    <p>${title}</p>
                </div>
                <div class="article-date">
                    <p>${date}</p>
                </div>
            </div>
            <div class="edit-delete-btn">
                <a class="edit-btn" href="/admin/edit">Edit</a>
                <a class="delete-btn" href="/admin/delete">Delete</a>
            </div>
        </div>`
    : ` <div class="article-container">
            <div class="article">
                <div class="article-name">
                    <p>${title}</p>
                </div>
                <div class="article-date">
                    <p>${date}</p>
                </div>
            </div>
        </div>` 
}

async function articlesLoader(isAdmin) {
    const articlesData = await readJSON();
    const tempArr = [];

    if (articlesData.length <= 0) {
        return 'No articles available'
    }

    Array.from(articlesData).forEach(dt => {
        tempArr.push(adminArticle(isAdmin, dt.title, dt.date))
    })
        
    return tempArr.join('');
}

export default async function htmlGenerator(isAdmin = false) {
    const artc = await articlesLoader(isAdmin);

    return(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script type="module" src="main.js" defer></script>
            <link rel="stylesheet" href="/css/reset.css">
            <link rel="stylesheet" href="/css/global.css">
            <link rel="stylesheet" href="style.css">
            ${adminCSS(isAdmin)}
            <title>Personal Blog</title>
        </head>
        <body>
            <div class="main">
                <nav>
                    <h1 class="nav-title">
                        <a href="/">Personal Blog</a>
                    </h1>
                    ${adminGreeting(isAdmin)}
                </nav>
                ${adminNewArticleBtn(isAdmin)}
                <div class="articles">
                    ${artc}
                </div>
            </div>
        </body>
        </html>         
    `)
}