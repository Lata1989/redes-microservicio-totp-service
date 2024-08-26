import speakeasy from 'speakeasy';
import qrcode from 'qrcode'; // Añadir importación de qrcode
import { getDB } from '../config/database.js';
import { totpCollection } from '../config/envConfig.js';
import { createTOTP } from '../models/totp.js';

// Generar un nuevo código TOTP
export async function generateTOTP(req, res) {
    const { email } = req.body;

    try {
        const secret = speakeasy.generateSecret().base32;
        const db = getDB();
        const totpCollectionRef = db.collection(totpCollection);

        const existingRecord = await totpCollectionRef.findOne({ email });
        if (existingRecord) {
            // Si ya existe, actualizar la secret
            await totpCollectionRef.updateOne({ email }, { $set: { secret, updatedAt: new Date() } });
        } else {
            // Si no existe, crear un nuevo registro
            const newTOTP = createTOTP(secret, email);
            await totpCollectionRef.insertOne(newTOTP);
        }

        res.status(200).json({ message: 'TOTP generado exitosamente', secret });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo generar el TOTP' });
    }
}

// Verificar un código TOTP
export async function verifyTOTP(req, res) {
    const { email, token } = req.body;

    try {
        const db = getDB();
        const totpCollectionRef = db.collection(totpCollection);

        const record = await totpCollectionRef.findOne({ email });
        if (!record) {
            return res.status(404).json({ error: 'TOTP no encontrado para este email' });
        }

        const verified = speakeasy.totp.verify({
            secret: record.secret,
            encoding: 'base32',
            token,
        });

        if (verified) {
            res.status(200).json({ message: 'TOTP verificado exitosamente' });
        } else {
            res.status(401).json({ error: 'TOTP inválido' });
        }
    } catch (error) {
        res.status(500).json({ error: 'No se pudo verificar el TOTP' });
    }
}

// Generar y devolver el código QR para TOTP
export async function generateQRCode(req, res) {
    const { username } = req.body;

    try {
        const db = getDB();
        const usersCollection = db.collection('users'); // Cambiar 'userCollection' a 'users'

        // Verificar si el usuario existe
        const user = await usersCollection.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Generar una clave secreta para TOTP
        const secret = speakeasy.generateSecret({
            name: `YourAppName (${username})`,
            length: 20,
        });

        // Guardar el secreto en la base de datos asociado con el usuario
        await usersCollection.updateOne(
            { username },
            { $set: { totpSecret: secret.base32, updatedAt: new Date() } }
        );

        // Generar el código QR
        const otpauthURL = secret.otpauth_url;
        qrcode.toDataURL(otpauthURL, (err, dataURL) => {
            if (err) {
                return res.status(500).json({ error: 'No se pudo generar el código QR' });
            }

            // Devolver el código QR como una imagen
            res.status(200).json({ qrCode: dataURL });
        });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo generar el código QR' });
    }
}
