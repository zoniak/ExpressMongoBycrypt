import express, { Request, Response } from 'express';
import Usuario from '../models/Usuario';

const router = express.Router();

// Obtener todos los usuarios (sin mostrar contraseñas)
router.get('/', async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.find().select('-password');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: (error as Error).message });
  }
});

// Crear un usuario
router.post('/', async (req: Request, res: Response) => {
  const usuario = new Usuario({
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
    edad: req.body.edad
  });

  try {
    const nuevoUsuario = await usuario.save();
    // No enviar la contraseña en la respuesta
    const usuarioRespuesta = nuevoUsuario.toObject();
    delete (usuarioRespuesta as any).password;
    res.status(201).json(usuarioRespuesta);
  } catch (error) {
    res.status(400).json({ mensaje: (error as Error).message });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const passwordValida = await (usuario as any).compararPassword(password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Login exitoso
    const usuarioRespuesta = usuario.toObject();
    delete (usuarioRespuesta as any).password;
    res.json({ 
      mensaje: 'Login exitoso',
      usuario: usuarioRespuesta
    });
  } catch (error) {
    res.status(500).json({ mensaje: (error as Error).message });
  }
});

export default router;