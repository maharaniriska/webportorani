import { NextRequest } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maharanirizka.vercel.app';

export async function GET(_request: NextRequest) {
  const content = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml

# Host directive is optional
Host: ${SITE_URL}
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    }
  });
}
