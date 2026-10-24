import { readFile, writeFile, rm } from "node:fs/promises";
import { render } from "../.prerender/entry-server.js";
const path = new URL("../dist/index.html", import.meta.url);
const template = await readFile(path, "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("Prerender root marker missing");
await writeFile(path, template.replace(marker, () => `<div id="root">${render()}</div>`));
await rm(new URL("../.prerender", import.meta.url), { recursive: true });
console.log("Prerendered the complete portfolio into static HTML.");
