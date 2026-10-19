import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function isWhiteBackground(imagePath) {
  try {
    // Get image metadata
    const metadata = await sharp(imagePath).metadata();
    const { width, height } = metadata;
    
    // We will extract a small border or just sample the corners and edges
    // Let's sample 10x10 from top-left, top-right, bottom-left, bottom-right
    const corners = [
      { left: 0, top: 0, width: 10, height: 10 },
      { left: width - 10, top: 0, width: 10, height: 10 },
      { left: 0, top: height - 10, width: 10, height: 10 },
      { left: width - 10, top: height - 10, width: 10, height: 10 }
    ];
    
    let whitePixels = 0;
    let totalPixels = 0;
    
    for (const region of corners) {
      const { data } = await sharp(imagePath)
        .extract(region)
        .raw()
        .toBuffer({ resolveWithObject: true });
        
      // data is a buffer of RGB or RGBA
      const channels = metadata.channels || 3;
      for (let i = 0; i < data.length; i += channels) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Check if pixel is very close to white
        if (r > 240 && g > 240 && b > 240) {
          whitePixels++;
        }
        totalPixels++;
      }
    }
    
    // If more than 80% of the corners are white, it's a white background
    const whiteRatio = whitePixels / totalPixels;
    return whiteRatio > 0.8;
  } catch (err) {
    console.error(`Error processing ${imagePath}:`, err);
    return false; // safe fallback
  }
}

async function test() {
   const dir = "C:/Users/PC/OneDrive/Desktop/dar-safia-v2/public/img/perfumes/Photos site web/Fond blanc/";
   const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.webp')).slice(0, 5);
   for (const f of files) {
      const isWhite = await isWhiteBackground(path.join(dir, f));
      console.log(`${f}: ${isWhite ? "WHITE BACKGROUND" : "OK"}`);
   }
}

test();
