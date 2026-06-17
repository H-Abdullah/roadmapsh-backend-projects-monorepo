import { fileURLToPath } from "node:url";
import path from "node:path";

// path to this file     
const __filename = fileURLToPath(import.meta.url);
// get dir of this file
const __dirname = path.dirname(__filename);

// article json path 
const articlesJSONDirPath = 'data';
const articleJSONPath = 'data/articles.json';


// -------------------------------- //
// export for app usage 

// get root dir path for project 
export const ROOT_DIR = path.join(__dirname, "..");

// get dir path of articles json 
export const ARTICLE_JSON_DIR_PATH = path.join(ROOT_DIR, articlesJSONDirPath);
// get json path of articles json 
export const ARTICLE_JSON_PATH = path.join(ROOT_DIR, articleJSONPath);