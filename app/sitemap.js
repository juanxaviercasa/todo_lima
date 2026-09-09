import fs from 'fs';
import path from 'path';

export default function sitemap() {
  const baseUrl = 'https://todo-lima.vercel.app';

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  const dataDir = path.join(process.cwd(), 'data');
  let categoryRoutes = [];

  try {
    const files = fs.readdirSync(dataDir);
    categoryRoutes = files
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        const categoria = file.replace('.json', '');
        return {
          url: `${baseUrl}/${categoria}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.8,
        };
      });
  } catch (error) {
    console.error('Error generando el sitemap:', error);
  }

  return [...routes, ...categoryRoutes];
}