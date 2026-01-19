import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUsuarioDocument } from '../types/usuario.types';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  edad: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

// Hash password antes de guardar
usuarioSchema.pre('save', async function(this: mongoose.HydratedDocument<any>) {
  if (!this.isModified('password')) {
    return;
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar contraseñas
usuarioSchema.methods.compararPassword = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model<IUsuarioDocument>('Usuario', usuarioSchema);

export default Usuario;