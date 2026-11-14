import fs from 'node:fs';
import path from 'node:path';
const [tmp, dest] = process.argv.slice(2);
if (!tmp || !dest) { console.error('usage: node decode-b64.mjs <tmp> <dest>'); process.exit(1); }
const b64 = fs.readFileSync(tmp, 'utf8').trim();
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, Buffer.from(b64, 'base64'));
fs.unlinkSync(tmp);
console.log('decoded-ok', dest, fs.statSync(dest).size, 'bytes');
