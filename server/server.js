import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';

import { PORT, DATA_DIR, UPLOADS_DIR } from './config/constants.js';
import contentRoutes from './routes/contentRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import { contentModel } from './models/contentModel.js';
import { menuModel } from './models/menuModel.js';
import { contactModel } from './models/contactModel.js';
import { userModel } from './models/userModel.js';
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initialize databases
contentModel.initialize();
menuModel.initialize();
contactModel.initialize();

// Serve public uploads statically
app.use('/api/uploads', express.static(UPLOADS_DIR));

// Routing namespaces Khai bao Routes
app.use('/api/content', contentRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);


// Verify database connection using userModel
try {
  const results = await userModel.getAllUsers();
  console.log(">>> Result = ", results);
} catch (err) {
  console.log(">>> Database connection check failed:", err.message);
}


// Start server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});


