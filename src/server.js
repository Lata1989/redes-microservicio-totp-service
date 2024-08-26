import app from './app.js';
import { connectDB } from './config/database.js'; // Usar connectDB
import { port } from './config/envConfig.js';

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Servidor TOTP funcionando en puerto ${port}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Salir con error si no se puede conectar
  }
}

startServer();
