import escapeHTML from "../utils/escape-html.js"

export default function formGenerator({
    formTitle = '',
    action = '',
    title = '',
    content = ''
} = {}) {
    return(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/form.css">
        <script type="module" src="/js/form.js" defer></script>
        <title>Mai Beloggu</title>
    </head>
    <body>
        <div class="main">
            <div class="title-field">
                <div>
                    <a href="/admin">Back</a>
                </div>
                <h1>${formTitle}</h3>
            </div>
            <div class="form-field">
                <form action="${action}" method="post">
                    <div class="field">
                        <label for="articleTitle">Title:</label>
                        <input 
                            type="text" 
                            name="articleTitle" 
                            id="article-title" 
                            value="${escapeHTML(title)}"
                            required">
                    </div>
                    <div class="field">
                        <label for="articleContent">Content:</label>
                        <textarea 
                            name="articleContent" 
                            id="article-content" 
                            cols="100" 
                            rows="15"
                            placeholder="Press 'Enter' to make paragraph"
                        >${escapeHTML(content)}</textarea>
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