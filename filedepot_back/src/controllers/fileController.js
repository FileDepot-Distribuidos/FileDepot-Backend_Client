import SoapService from '../services/soapService.js';

class FileController {

    // Subir un archivo a través del servicio SOAP
    static async uploadFile(req, res) {
        try {
            const { base64, name, size } = req.body;

            const owner = req.user.userId;

            const response = await SoapService.processFileRequest(
                'upload',
                { base64, name, size, owner }
            );

            if (response.success) {
                console.log(response);

                return res.status(201).json(response.file);
            } else {
                return res.status(400).json({ message: 'Error al subir el archivo' });
            }
        } catch (error) {
            console.error('Error al subir archivo:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    static recibirArchivo(req, res) {
        const { name, type, size } = req.body;

        if (!name || !type || !size) {
            return res.status(400).json({ message: "Faltan datos del archivo" });
        }

        console.log("Datos recibidos:", { name, type, size });

        res.json({ message: "Datos del archivo recibidos correctamente" });
    }


    static async listFiles(req, res) {
        try {

            const userId = req.user.userId;

            console.log(`userId: ${userId}`);
            

            const response = await SoapService.processFileRequest(
                'getFiles',
                { userId }
            );

            if (response.success) {
                const parsedData = JSON.parse(response.data);
                return res.status(201).json(parsedData);
            } else {
                return res.status(400).json({ message: 'Error al obtener archivos' });
            }
        } catch (error) {
            console.error('Error al listar archivos:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    // Leer un archivo usando SOAP
    static async readFile(req, res) {
        try {
            const { fileID } = req.params;

            const response = await SoapService.processFileRequest(
                'read',
                { fileID }
            );

            if (response.success) {
                return res.status(200).json(response.file);
            } else {
                return res.status(404).json({ message: 'Archivo no encontrado' });
            }
        } catch (error) {
            console.error('Error al leer archivo:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    // Descargar un archivo a través de SOAP
    static async downloadFile(req, res) {
        try {
            const { fileID } = req.params;

            const response = await SoapService.processFileRequest(
                'download',
                { fileID }
            );

            if (response.success) {
                return res.status(200).json({ url: response.downloadUrl });
            } else {
                return res.status(404).json({ message: 'Archivo no encontrado' });
            }
        } catch (error) {
            console.error('Error al descargar archivo:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    // Mover un archivo usando SOAP
    static async moveFile(req, res) {
        try {
            const { fileID, newDirectoryID } = req.body;

            const response = await SoapService.processFileRequest(
                'move',
                { fileID, newDirectoryID }
            );

            if (response.success) {
                return res.status(200).json({ message: `Archivo ${fileID} movido` });
            } else {
                return res.status(400).json({ message: 'No se pudo mover el archivo' });
            }
        } catch (error) {
            console.error('Error al mover archivo:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    // Eliminar un archivo con SOAP
    static async deleteFile(req, res) {
        try {
            const { fileID } = req.body;

            const response = await SoapService.processFileRequest(
                'delete',
                { fileID }
            );

            if (response.success) {
                return res.status(200).json({ message: `Archivo ${fileID} eliminado` });
            } else {
                return res.status(400).json({ message: 'No se pudo eliminar el archivo' });
            }
        } catch (error) {
            console.error('Error al eliminar archivo:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }
}

export default FileController;