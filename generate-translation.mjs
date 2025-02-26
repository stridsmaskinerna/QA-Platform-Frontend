import fs from "fs";
import path from "path";
import { cwd } from "process";

const localesDir = path.join(cwd(), "src/locale");
const languages = ["en", "sv"];
const jsonIndexFile = "index.json";

console.log("> Building translation files...");

languages.forEach((lang) => {
    const langDir = path.join(localesDir, lang);
    const files = fs.readdirSync(langDir).filter(file => 
        file.endsWith(".json") && file !== jsonIndexFile);

    let mergedTranslations = {};
    files.forEach((file) => {
        const filePath = path.join(langDir, file);
        const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
        mergedTranslations = { ...mergedTranslations, ...content };
    });

    fs.writeFileSync(
        path.join(langDir, jsonIndexFile),
        JSON.stringify({ translation: mergedTranslations }, null, 4)
    );
});
