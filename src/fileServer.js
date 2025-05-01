import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

// Obtenemos la LAN permitida
const allowedLan = process.env.ALLOWED_LAN; // ejemplo: '192.168.20'

app.use(cookieParser());

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // para Postman o curl
        
        // Permitimos localhost y cualquier IP que empiece con 192.168.20.*
        const regexLan = new RegExp(`^http://${allowedLan}\\.\\d{1,3}:8080$`);

        if (regexLan.test(origin) || origin === 'http://localhost:8080') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Importar rutas
import routes from './routes/routes.js';
app.use('/api', routes);

// Iniciar servidor
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.listen(port, () => {
    console.log(`Servidor corriendo en http://${host}:${port}`);
});