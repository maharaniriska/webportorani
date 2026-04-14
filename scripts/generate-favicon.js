const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const sharp = require('sharp');
const toIco = require('to-ico');

async function main() {
  const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/+$/g, '');
  const publicDir = path.join(process.cwd(), 'public');
  try {
    console.log('Generating favicon from hero image...');

    // Try to fetch hero metadata and image; if anything fails, fall back
    // to a local `public/favicon.svg` or an embedded placeholder.
    let srcBuffer;
    try {
      const res = await fetch(`${API_URL}/api/hero`);
      if (res.ok) {
        const hero = await res.json();
        const photo = hero?.photo_url;
        if (photo) {
          try {
            const imageUrl = /^https?:\/\//i.test(photo) ? photo : `${API_URL}${photo}`;
            const imgRes = await fetch(imageUrl);
            if (imgRes.ok) {
              srcBuffer = Buffer.from(await imgRes.arrayBuffer());
            } else {
              console.warn('Failed to fetch hero image, falling back to local asset');
            }
          } catch (e) {
            console.warn('Error fetching hero image, falling back to local asset');
          }
        }
      } else {
        console.warn('hero API responded with non-ok status, falling back');
      }
    } catch (e) {
      console.warn('Could not reach hero API, falling back:', e.message || e);
    }

    if (!srcBuffer) {
      try {
        srcBuffer = await fs.readFile(path.join(publicDir, 'favicon.svg'));
      } catch (e) {
        srcBuffer = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="100%" height="100%" fill="#be185d"/><text x="50%" y="55%" font-size="220" font-family="Catamaran, sans-serif" text-anchor="middle" fill="#fff">M</text></svg>');
      }
    }

    const sizes = [16, 32, 48, 64, 128, 256];
    const pngBuffers = [];

    // create in-memory PNG buffers for png-to-ico
    for (const s of sizes) {
      const buf = await sharp(srcBuffer).resize(s, s, { fit: 'cover' }).png().toBuffer();
      pngBuffers.push(buf);
    }

    const icoBuffer = await toIco(pngBuffers);

    // ensure public directory exists
    await fs.mkdir(publicDir, { recursive: true });
    await fs.writeFile(path.join(publicDir, 'favicon.ico'), icoBuffer);
    // also write a 32x32 png for compatibility
    await fs.writeFile(path.join(publicDir, 'favicon-32.png'), pngBuffers[1]);

    console.log('favicon.ico generated at public/favicon.ico');
  } catch (err) {
    console.warn('Could not generate favicon automatically:', err.message || err);
    // don't fail build — return gracefully
  }
}

main();
