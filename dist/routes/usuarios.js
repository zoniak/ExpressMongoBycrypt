"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const router = express_1.default.Router();
// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario_1.default.find();
        res.json(usuarios);
    }
    catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});
// Crear un usuario
router.post('/', async (req, res) => {
    const usuario = new Usuario_1.default({
        nombre: req.body.nombre,
        email: req.body.email,
        edad: req.body.edad
    });
    try {
        const nuevoUsuario = await usuario.save();
        res.status(201).json(nuevoUsuario);
    }
    catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});
exports.default = router;
