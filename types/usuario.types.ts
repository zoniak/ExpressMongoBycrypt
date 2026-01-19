import { Document } from 'mongoose';

export interface IUsuario {
  nombre: string;
  email: string;
  password: string;
  edad?: number;
}

export interface IUsuarioDocument extends IUsuario, Document {
  compararPassword(passwordIngresada: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}