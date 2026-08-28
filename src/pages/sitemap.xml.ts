import type { APIRoute } from 'astro';
import crewData from '../data/crew.json';

export const prerender = true;

export const GET: APIRoute = () => {
  const lastModified = new Date(crewData.retrievedAt).toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://astronauts.darrentoner.com/</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
