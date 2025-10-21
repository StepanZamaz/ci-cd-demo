import fs from "fs";
import path from "path";

const srcDir = path.resolve("src");
const distDir = path.resolve("dist");

console.log("Building project...");

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

fs.cpSync(srcDir, distDir, { recursive: true });

console.log("Build complete!");
