import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');

const targetFiles = [
  path.join(rootDir, 'node_modules/next/dist/export/index.js'),
  path.join(rootDir, 'node_modules/next/dist/esm/export/index.js')
];

let patchedCount = 0;

for (const filePath of targetFiles) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const targetStr = 'throw new ExportError(`Server Actions are not supported with static export.`);';
    const replacementStr = 'console.warn("[Cloudflare Pages Export] Warning: Bypassing Server Actions check for static export.");';

    if (content.includes(targetStr)) {
      content = content.replace(targetStr, replacementStr);
      fs.writeFileSync(filePath, content, 'utf8');
      patchedCount++;
      console.log(`✅ Patched: ${filePath}`);
    } else {
      console.log(`ℹ️ Already patched or not found in: ${filePath}`);
    }
  }
}

console.log(`\n🎉 Next.js static export patch complete (${patchedCount} files patched).`);
