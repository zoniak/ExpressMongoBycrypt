import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Usuario from '../models/Usuario';
import { usuariosSeed } from '../data/usuariosSeed';
import connectDB from '../config/database';

dotenv.config();

const seedDB = async (): Promise<void> => {
  try {
    // Conectar a MongoDB
    await connectDB();

    // Limpiar la colección (opcional)
    await Usuario.deleteMany({});
    console.log('Usuarios anteriores eliminados');

    // Insertar usuarios
    const usuariosCreados = [];
    for (const usuarioData of usuariosSeed) {
      const usuario = new Usuario(usuarioData);
      const usuarioGuardado = await usuario.save();
      usuariosCreados.push(usuarioGuardado);
    }
    console.log(` ${usuariosCreados.length} usuarios insertados correctamente`);

    // Mostrar un ejemplo de contraseña hasheada
    const primerUsuario = await Usuario.findOne({ email: 'ana.garcia@email.com' });
    
    if (primerUsuario) {
      console.log('\n Ejemplo de contraseña hasheada:');
      console.log('Email:', primerUsuario.email);
      console.log('Password original: Ana123456');
      console.log('Password hasheada:', primerUsuario.password);
      console.log('\n Puedes probar el login con estos datos');
    }

    await mongoose.connection.close();
    console.log('\n Conexión cerrada');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDB();
