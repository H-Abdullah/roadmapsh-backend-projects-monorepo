import {
    existsSync,
    mkdirSync,
    writeFileSync
} from "node:fs";
import { ARTICLE_JSON_DIR_PATH, ARTICLE_JSON_PATH } from "../utils/paths.js";

function createDir() {
    if (!existsSync(ARTICLE_JSON_DIR_PATH)) {
        mkdirSync(ARTICLE_JSON_DIR_PATH);
    };
}

function setupJSON() {

    if (!existsSync(ARTICLE_JSON_PATH)) {
        writeFileSync(
            ARTICLE_JSON_PATH, 
            JSON.stringify(template, null, 4))
    };
}

export default function initializeStorage() {
    createDir();
    setupJSON();
}
