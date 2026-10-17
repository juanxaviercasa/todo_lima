import sharp from 'sharp';
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f0f9ff"/><text x="70" y="300" font-family="Arial" font-size="94" font-weight="bold" fill="#0f172a">Todo Lima</text><text x="70" y="385" font-family="Arial" font-size="38" fill="#0369a1">Negocios y servicios cerca de ti</text><text x="70" y="545" font-family="Arial" font-size="32" fill="#334155">todolima.com</text></svg>`);
const logo = await sharp('public/images/logo.jpg').resize(160,160).toBuffer();
await sharp(svg).composite([{input:logo,left:970,top:70}]).jpeg({quality:90}).toFile('public/images/compartir-todo-lima.jpg');
