import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import usuariosRouter from './routes/usuarios';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
connectDB();

// Ruta principal - PROPERLY TYPED
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    mensaje: '¡Bienvenido a la API de ExpressMongo!',
    endpoints: {
      usuarios: '/api/usuarios'
    }
  });
});

// Rutas
app.use('/api/usuarios', usuariosRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});