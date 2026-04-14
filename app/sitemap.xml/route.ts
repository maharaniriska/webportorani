import { NextRequest } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maharanirizka.vercel.app';

export async function GET(_request: NextRequest) {
  // Basic sitemap with primary pages. Extend by fetching dynamic resources if needed.
  const pages = ['/', '/about', '/portfolio', '/contact'];
  const lastmod = new Date().toISOString();

  const urls = pages.map((p) => {
    const loc = new URL(p, SITE_URL).toString();
    return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
    </url>
  `;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
    </urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
