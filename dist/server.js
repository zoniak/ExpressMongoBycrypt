"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
// Cargar variables de entorno
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Conectar a MongoDB
(0, database_1.default)();
// Ruta principal - PROPERLY TYPED
app.get('/', (req, res) => {
    res.json({
        mensaje: '¡Bienvenido a la API de ExpressMongo!',
        endpoints: {
            usuarios: '/api/usuarios'
        }
    });
});
// Rutas
app.use('/api/usuarios', usuarios_1.default);
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
