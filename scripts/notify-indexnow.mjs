import { readdir, readFile } from "node:fs/promises";
const origin = "https://harshit-vashisht.github.io/";
const directory = new URL("../public/", import.meta.url);
const keyFile = (await readdir(directory)).find(name => /^[a-f0-9]{32}\.txt$/.test(name));
if (!keyFile) throw new Error("Missing IndexNow verification key");
const key = (await readFile(new URL(keyFile, directory), "utf8")).trim();
const keyLocation = origin + keyFile;
const verification = await fetch(keyLocation, { signal: AbortSignal.timeout(30000) });
if (!verification.ok || (await verification.text()).trim() !== key) throw new Error("Live IndexNow verification file is not available");
const result = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ host: new URL(origin).host, key, keyLocation, urlList: [origin] }),
  signal: AbortSignal.timeout(30000),
});
if (![200, 202].includes(result.status)) throw new Error(`IndexNow HTTP ${result.status}: ${await result.text()}`);
console.log(`IndexNow received the notification (HTTP ${result.status}); indexing is not guaranteed.`);
