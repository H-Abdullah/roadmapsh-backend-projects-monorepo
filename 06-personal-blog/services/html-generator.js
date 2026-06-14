export default function htmlGenerator(isAdmin = false) {

    const adminCSS = isAdmin
    ? '<link rel="stylesheet" href="/css/admin.css">'
    : '';

    const adminGreeting = isAdmin
    ? '<p>Welcome User</p>'
    : '<a class="login-btn" href="/admin">login</a>';

    const adminNewArticleBtn = isAdmin
    ? ` <div class="add-new-article-btn">
            <a href="/admin/add">Add new article</a>
        </div>`
    : '';

    const adminArticle = isAdmin
    // probably use function later to pass arg 
    ? ` <div class='article-container'> 
            <div class="article">
                <div class="article-name">
                    <p>Article 1</p>
                </div>
                <div class="article-date">
                    <p>Date 1</p>
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
                    <p>Article 1</p>
                </div>
                <div class="article-date">
                    <p>Date 1</p>
                </div>
            </div>
        </div>`   

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
            ${adminCSS}
            <title>Personal Blog</title>
        </head>
        <body>
            <div class="main">
                <nav>
                    <h1 class="nav-title">
                        <a href="/">Personal Blog</a>
                    </h1>
                    ${adminGreeting}
                </nav>
                ${adminNewArticleBtn}
                <div class="articles">
                    ${Array.from({ length: 10 })
                        .map(() => adminArticle)
                        .join('')
                    }
                </div>
            </div>
        </body>
        </html>         
    `)
}