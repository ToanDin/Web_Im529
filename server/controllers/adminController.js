import path from 'path';
import sharp from 'sharp';
import { UPLOADS_DIR, ADMIN_CREDENTIALS, MOCK_TOKEN } from '../config/constants.js';


export const login = (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    res.json({ token: MOCK_TOKEN });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials' });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const type = req.query.type || 'generic';
    const filename = `img-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const outputPath = path.join(UPLOADS_DIR, filename);

    let pipeline = sharp(req.file.buffer);

    // Auto-edit / process image based on placement type
    if (type === 'heroBg') {
      pipeline = pipeline
        .resize(1920, 1080, { fit: 'cover', withoutEnlargement: true })
        .modulate({
          brightness: 0.45,   // Darken considerably so hero copy text reads clearly
          saturation: 0.8     // Saturated deep colors
        })
        .gamma(1.1)           // Enrich contrast curves
        .webp({ quality: 80 });
    } else if (type === 'aboutImage') {
      pipeline = pipeline
        .resize(1000, 750, { fit: 'cover', withoutEnlargement: true })
        .modulate({
          brightness: 0.6,    // Slightly dimmed for atmospheric layout consistency
          saturation: 0.95
        })
        .webp({ quality: 85 });
    } else if (type === 'menuImage') {
      pipeline = pipeline
        .resize(800, 600, { fit: 'cover', withoutEnlargement: true })
        .modulate({
          brightness: 0.75,   // Keep bright enough to see drink details
          saturation: 1.15    // Color pop for ingredients
        })
        .webp({ quality: 85 });
    } else {
      pipeline = pipeline
        .resize(1200, null, { withoutEnlargement: true })
        .webp({ quality: 85 });
    }

    await pipeline.toFile(outputPath);

    const fileUrl = `/api/uploads/${filename}`;
    res.json({ success: true, fileUrl });
  } catch (err) {
    console.error('Image processing error:', err);
    res.status(500).json({ error: 'Failed to process and format uploaded image.' });
  }
};
