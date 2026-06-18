import { ARTICLE_JSON_PATH } from "../utils/paths.js";
import { readFile, writeFile } from "node:fs/promises";
import { writeFileSync } from "node:fs";
import convertTitleToSlug from "../utils/convert-title-to-slug.js";
import getCurrDate from "../utils/get-date.js";


function resetJSON() {
    try {
        writeFileSync(ARTICLE_JSON_PATH, '[]');
    } catch (err) {
        console.error(`${err}: Something wrong when try to reset the file`);
    }
}

async function readJSON() {
    try {
        const data = await readFile(ARTICLE_JSON_PATH, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error(`${err}: Something wrong when trying to read file`);
    }
}

async function saveNewDataToJSON(data) {
    try {
        const updatedData = JSON.stringify(data, null, 2);
        return await writeFile(ARTICLE_JSON_PATH, updatedData);
    } catch (err) {
        console.error(`${err}: Something wrong when trying to save file`);
    }
}

async function saveArticle(title, content) {
    const newData = {
        slug: convertTitleToSlug(title),
        title: title,
        content: content,
        date: getCurrDate()
    }

    try {
        const data = await readJSON();
        data.push(newData);
        await saveNewDataToJSON(data);
    } catch (err) {
        console.error(`${err}: Something wrong when trying to save article`);
    }
}

export {
    saveArticle,
    readJSON,
}
