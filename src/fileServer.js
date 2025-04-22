import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Importar las rutas
import routes from './routes/routes.js';
app.use('/api', routes);

// Iniciar el servidor
const port = process.env.FILES_PORT || 3000;
const host = process.env.FILES_HOST || 'localhost';

app.listen(port, () => {
    console.log(`Servidor corriendo en http://${host}:${port}`);
});
