import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to save image data to a file
async function saveImage(data, outputPath) {
  await fs.writeFile(outputPath, data);
}

// Create images directory if it doesn't exist
const imagesDir = join(__dirname, '../public/images');
try {
  await fs.access(imagesDir);
} catch {
  await fs.mkdir(imagesDir, { recursive: true });
}

// Create placeholder images
const placeholderSvg = `
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f0f0f0"/>
  <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#666" text-anchor="middle" dy=".3em">
    Placeholder Image
  </text>
</svg>`;

// Save each image
const images = [
  { name: 'dice-set-1.jpg', data: placeholderSvg },
  { name: 'dice-set-2.jpg', data: placeholderSvg },
  { name: 'product-cover.jpg', data: placeholderSvg },
  { name: 'product-cover-2.jpg', data: placeholderSvg },
  { name: 'kids-playing.jpg', data: placeholderSvg }
];

for (const image of images) {
  const outputPath = join(imagesDir, image.name.replace('.jpg', '.svg'));
  await saveImage(image.data, outputPath);
  console.log(`Saved ${image.name}`);
}
