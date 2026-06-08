export default function htmlGenerator() {
    return(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script type="module" src="main.js" defer></script>
            <link rel="stylesheet" href="style.css">
            <title>Personal Blog</title>
        </head>
        <body>
            <div class="main">
                <nav>
                    <h1>Personal Blog</h1>
                </nav>
                <div class="articles">
                    <div class="article">
                        <p class="article-name">Article 1</p>
                        <p class="article-date">Date 1</p>
                    </div>
                    <div class="article">
                        <p class="article-name">Article 2</p>
                        <p class="article-date">Date 2</p>
                    </div>
                    <div class="article">
                        <p class="article-name">Article 3</p>
                        <p class="article-date">Date 3</p>
                    </div>
                    <div class="article">
                        <p class="article-name">Article 4</p>
                        <p class="article-date">Date 4</p>
                    </div>
                    <div class="article">
                        <p class="article-name">Article 5</p>
                        <p class="article-date">Date 5</p>
                    </div>
                    <div class="article">
                        <p class="article-name">Article 6</p>
                        <p class="article-date">Date 6</p>
                    </div>
                    <div class="article">
                        <p class="article-name">Article 7</p>
                        <p class="article-date">Date 7</p>
                    </div>
                    <div class="article">
                        <p class="article-name">Article 8</p>
                        <p class="article-date">Date 8</p>
                    </div>
                    <div class="article">
                        <p class="article-name">Article 9</p>
                        <p class="article-date">Date 9</p>
                    </div>
                    <div class="article">
                        <p class="article-name">Article 10</p>
                        <p class="article-date">Date 10</p>
                    </div>
                    <div class="article">
                        <p class="article-name">Article 11</p>
                        <p class="article-date">Date 11</p>
                    </div>
                    <div class="article">
                        <p class="article-name">Article 12</p>
                        <p class="article-date">Date 12</p>
                    </div>
                </div>
            </div>
        </body>
        </html>         
    `)
}