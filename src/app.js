import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './config/database.js';
import totpRoutes from './routes/totpRoutes.js';

const app = express();

app.use(bodyParser.json());

// Rutas del microservicio TOTP
app.use('/totp', totpRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Microservicio TOTP funcionando OK!');
});

export default app;
