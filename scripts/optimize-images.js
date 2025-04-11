const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = {
  'dice-set-1.jpg': 'Image 1',
  'dice-set-2.jpg': 'Image 2',
  'product-cover.jpg': 'Image 3',
  'product-cover-2.jpg': 'Image 4',
  'kids-playing.jpg': 'Image 5'
};

const outputDir = path.join(__dirname, '../public/images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Process each image
Object.entries(images).forEach(([filename, base64Data]) => {
  const outputPath = path.join(outputDir, filename);
  
  sharp(Buffer.from(base64Data, 'base64'))
    .resize(800, null, { // Resize to max width of 800px while maintaining aspect ratio
      withoutEnlargement: true,
      fit: 'inside'
    })
    .jpeg({
      quality: 85,
      progressive: true
    })
    .toFile(outputPath)
    .then(() => console.log(`Optimized ${filename}`))
    .catch(err => console.error(`Error processing ${filename}:`, err));
});
