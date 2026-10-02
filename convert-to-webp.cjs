const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const categoriesDir = path.join(__dirname, 'public', 'images', 'categories');

async function convertToWebp() {
    try {
        const files = fs.readdirSync(categoriesDir);
        
        for (const file of files) {
            if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')) {
                const filePath = path.join(categoriesDir, file);
                const fileBaseName = path.parse(file).name;
                
                // Clean the name from timestamp if needed: car_wash_12345.jpg -> car_wash.webp
                const cleanName = fileBaseName.replace(/_\d+$/, '').replace(/-/g, '_');
                const webpPath = path.join(categoriesDir, `${cleanName}.webp`);

                console.log(`Convirtiendo ${file} a WEBP...`);
                
                await sharp(filePath)
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                
                console.log(`¡Éxito! Eliminando archivo original: ${file}`);
                fs.unlinkSync(filePath);
            }
        }
        
        console.log('¡Todas las imágenes han sido convertidas a WEBP exitosamente!');
    } catch (error) {
        console.error('Error al convertir imágenes:', error);
    }
}

convertToWebp();
