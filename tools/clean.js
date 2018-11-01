// This is implemented in .js instead of .ts so we don't need to depend on ts-node etc.
// Running yarn run clean in a previously cleaned repository will be very common.
// We don't want a requirement to do `yarn` before you can do `yarn run clean`.

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
            // Folder - recurse into it.
            deleteFolderRecursive(file);
        } else {
            // File - unlink it.
            fs.unlinkSync(file);
        }
    });

    // Folder is now empty, remove it.
    fs.rmdirSync(path);
}

deleteFolderRecursive(pathLib.join(__dirname, "..", "dist"));

if (process.argv.indexOf("--all") >= 0) {
    deleteFolderRecursive(pathLib.join(__dirname, "..", "node_modules"));
}
