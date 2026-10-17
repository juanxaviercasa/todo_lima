import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('out');
createServer(async (req,res) => {
 try {
  let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if (!file.startsWith(root + path.sep) && file !== root) throw Error('path');
  try { if ((await stat(file)).isDirectory()) { try { await stat(file + '.html'); file += '.html'; } catch { file=path.join(file,'index.html'); } } } catch { file += '.html'; }
  const data=await readFile(file);
  const type={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png'}[path.extname(file)] || 'application/octet-stream';
  res.writeHead(200,{'Content-Type':type});res.end(data);
 } catch {res.writeHead(404);res.end('Not found');}
}).listen(3100,'127.0.0.1');
