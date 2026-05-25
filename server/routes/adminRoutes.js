import express from 'express';
import { login, uploadImage } from '../controllers/adminController.js';
import { updateContent } from '../controllers/contentController.js';
import { saveMenuItem, deleteMenuItem } from '../controllers/menuController.js';
import { getContacts, deleteContact } from '../controllers/contactController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Public route
router.post('/login', login);

// Protected routes (require valid Bearer token)
router.post('/upload', authMiddleware, upload.single('image'), uploadImage);
router.post('/content', authMiddleware, updateContent);
router.post('/menu', authMiddleware, saveMenuItem);
router.delete('/menu/:category/:id', authMiddleware, deleteMenuItem);
router.get('/contacts', authMiddleware, getContacts);
router.delete('/contacts/:id', authMiddleware, deleteContact);

export default router;
