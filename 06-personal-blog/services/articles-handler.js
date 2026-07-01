import { ARTICLE_JSON_PATH } from "../utils/paths.js";
import { readFile, writeFile } from "node:fs/promises";
import { write, writeFileSync } from "node:fs";
import convertTitleToSlug from "../utils/convert-title-to-slug.js";
import getCurrDate from "../utils/get-date.js";

// =============== Public API / Function ===============
async function saveArticle({
    title = '',
    content = ''
} = {}) {
    const newData = {
        id: undefined,
        slug: convertTitleToSlug(title),
        title: title,
        content: content,
        date: getCurrDate()
    }
    try {
        // tukar dari mutable to immutable 
        const data = await readJSON();
        const nextIdCounter = data.idCounter += 1;
        
        newData.id = nextIdCounter;
        
        data.articles.push(newData);
        data.idCounter = nextIdCounter;
        
        await writeJSON(data);
    } catch (err) {
        console.error(`${err}: Something wrong when trying to save article`);
    }
}

async function editArticle({
    id = '',
    title = '',
    content = ''
} = {}) {
    const data = await readJSON();
    const updatedArticles = data.articles.map((articleObj) => {
        if (articleObj.id === id) {
            articleObj.title = title;
            articleObj.content = content
            return articleObj;
        }
        return articleObj;
    });
    const updatedJSON = {
        ...data,
        articles: updatedArticles
    };
    await writeJSON(updatedJSON);
}

async function deleteArticle(id) {
    const data = await readJSON();
    const updatedArticles = data.articles.filter(item => id !== item.id);
    const updatedJSON = {
        ...data,
        articles: updatedArticles
    }
    await writeJSON(updatedJSON);
}

async function readJSON() {
    try {
        const data = await readFile(ARTICLE_JSON_PATH, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error(`${err}: Something wrong when trying to read file`);
    }
}

async function extractArticleData(id) {
    const data = await readJSON();
    let title = '';
    let content = '';
    for (const item of data.articles) {
        if (id === item.id) {
            title = item.title;
            content = item.content;
        }
    }
    return { title, content };
}

async function extractArticleDataUsingSlug(slug) {
    const data = await readJSON();
    let title = '';
    let content = '';
    for (const item of data.articles) {
        if (slug === item.slug) {
            title = item.title;
            content = item.content;
        }
    }
    return { title, content };
}


// =============== Private Helper - Internal Usage ===============
async function writeJSON(data) {
    try {
        const updatedData = JSON.stringify(data, null, 4);
        return await writeFile(ARTICLE_JSON_PATH, updatedData);
    } catch (err) {
        console.error(`${err}: Something wrong when trying to save file`);
    }
}

function sanitizeContent(content) {
    const splittedContent = content.trim().split(/\r?\n\s*\r?\n/);
}


// =============== Internal usage only - For testing and debug =============== 
function _resetJSON() {
    const template = {
        idCounter: 0,
        articles: []
    };
    try {
        writeFileSync(
            ARTICLE_JSON_PATH, 
            JSON.stringify(template, null, 4));
    } catch (err) {
        console.error(`${err}: Something wrong when try to reset the file`);
    }
}

export {
    saveArticle,
    editArticle,
    deleteArticle,
    readJSON,
    extractArticleData,
    extractArticleDataUsingSlug
}