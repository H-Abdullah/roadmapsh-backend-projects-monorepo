export default formGenerator() {
    return(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="form.css">
        <script type="module" src="form.js" defer></script>
        <title>Add new article</title>
    </head>
    <body>
        <div class="main">
            <div class="title-field">
                <div>
                    <a href="/admin">Back</a>
                </div>
                <h1>Add new article</h3>
            </div>
            <div class="form-field">
                <form action="/publish-article" method="post">
                    <div class="field">
                        <label for="article-title">Title:</label>
                        <input type="text" name="article-title" id="article-title" placeholder="Article Title">
                    </div>
                    <div class="field">
                        <label for="article-content">Content:</label>
                        <textarea name="article-content" id="article-content" cols="100" rows="15" placeholder="Article Content"></textarea>
                    </div>
                    <div class="submit-btn">
                        <button type="submit">Publish</button>
                    </div>
                </form>
            </div>
        </div>
    </body>
    </html>                
    `)
}