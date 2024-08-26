import express from 'express';
import { generateTOTP, verifyTOTP, generateQRCode } from '../controllers/totpController.js';

const router = express.Router();

// Ruta para generar un TOTP
router.post('/generate', generateTOTP);

// Ruta para verificar un TOTP
router.post('/verify', verifyTOTP);

// Ruta para generar y obtener el código QR
router.post('/generate-qr', generateQRCode);

export default router;
