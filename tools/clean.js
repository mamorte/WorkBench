const fs = require("fs");
const pathLib = require("path");
const process = require("process");

function listFolder(path) {
    return fs
        .readdirSync(path)
        .filter(file => file !== "." && file !== "..")
        .map(file => pathLib.join(path, "", file));
}

function deleteFolderRecursive(path) {
    if (!fs.existsSync(path)) {
        return;
    }
    listFolder(path).forEach(file => {
        if (fs.lstatSync(file).isDirectory()) {
            deleteFolderRecursive(file);
        } else {
            fs.unlinkSync(file);
        }
    });

    fs.rmdirSync(path);
}

deleteFolderRecursive(pathLib.join(__dirname, "..", "dist"));

if (process.argv.indexOf("--all") >= 0) {
    deleteFolderRecursive(pathLib.join(__dirname, "..", "node_modules"));
}
