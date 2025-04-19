import express, { json } from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // puedes ajustar el límite
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Importar las rutas
import routes from './routes/routes.js';
app.use('/api', routes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
