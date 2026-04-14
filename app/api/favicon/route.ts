import { NextRequest } from 'next/server';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://apiportomaharani.pythonanywhere.com').replace(/\/+$/g, '');

export async function GET(_request: NextRequest) {
  try {
    const res = await fetch(`${API_URL}/api/hero`);
    if (!res.ok) return new Response('Not found', { status: 404 });
    const hero = await res.json();
    const photo = hero?.photo_url;
    if (!photo) return new Response('Not found', { status: 404 });
    const imageUrl = /^https?:\/\//i.test(photo) ? photo : `${API_URL}${photo}`;

    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) return new Response('Not found', { status: 404 });

    const buffer = Buffer.from(await imgRes.arrayBuffer());
    const contentType = imgRes.headers.get('content-type') || 'image/png';

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
      },
    });
  } catch (e) {
    return new Response('Error', { status: 500 });
  }
}
