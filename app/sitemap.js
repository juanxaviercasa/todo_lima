import fs from 'fs';
import path from 'path';

export default function sitemap() {
  const baseUrl = 'https://todolima.com';

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/baja`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/libro-de-reclamaciones`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
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

  return [...staticRoutes, ...categoryRoutes];
}