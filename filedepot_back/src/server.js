import { listen } from "./app";

const PORT = process.env.PORT || 5000;

listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
