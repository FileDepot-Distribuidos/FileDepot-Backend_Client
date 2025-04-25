import SoapService from '../services/soapService.js';

class ShareController {
    
    // Compartir un archivo a través de SOAP
    static async shareFile(req, res) {
        // Validar el token JWT


        try {
            const sharedBy = req.user.userId;

            const { sharedWith, sharedFile } = req.body;

            console.log('sharedWith:', sharedWith);
            console.log('sharedBy:', sharedBy);
            console.log('sharedFile:', sharedFile);
            
            // Llamada al servicio SOAP
            const response = await SoapService.processShareRequest(
                'shareFile',
                { sharedWith, sharedBy, sharedFile }
            );

            if (response.success) {
                return res.status(201).json(response.share);
            } else {
                return res.status(400).json({ message: 'Error al compartir el archivo' });
            }
        } catch (error) {
            console.error('Error al compartir archivo:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    // Compartir un directorio usando SOAP
    static async shareDirectory(req, res) {
        try {

            const sharedBy = req.user.userId;
            const { sharedWith, sharedDirectory } = req.body;

            console.log('sharedWith:', sharedWith);
            console.log('sharedBy:', sharedBy);
            console.log('sharedDirectory:', sharedDirectory);

            // Llamada al servicio SOAP
            const response = await SoapService.processShareRequest(
                'shareDirectory',
                { sharedWith, sharedBy, sharedDirectory }
            );

            if (response.success) {
                return res.status(201).json(response.share);
            } else {
                return res.status(400).json({ message: 'Error al compartir el directorio' });
            }
        } catch (error) {
            console.error('Error al compartir directorio:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    // Revocar acceso a un archivo/directorio compartido usando SOAP
    static async revokeAccess(req, res) {
        try {
            const { shareID } = req.body;

            // Llamada a SOAP
            const response = await SoapService.processShareRequest(
                'revokeAccess',
                { shareID }
            );

            if (response.success) {
                return res.status(200).json({ message: `Acceso revocado para el share ${shareID}` });
            } else {
                return res.status(400).json({ message: 'No se pudo revocar el acceso' });
            }
        } catch (error) {
            console.error('Error al revocar acceso:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    // Listar archivos compartidos usando SOAP
    static async listSharedFiles(req, res) {

        const userId = req.user.userId; // Obtener el ID del usuario desde el token JWT

        try {
            // Llamada a SOAP
            const response = await SoapService.processShareRequest('listSharedFiles', {
                userId
            });

            if (response.success) {
                const parsedData = JSON.parse(response.data);
                return res.status(201).json(parsedData);
            } else {
                return res.status(400).json({ message: 'No se pudieron recuperar los archivos compartidos' });
            }
        } catch (error) {
            console.error('Error al listar archivos compartidos:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    static async listSharedDirs(req, res) {

        const userId = req.user.userId;

        console.log("Se estan listando carpetas compartidas para el usuario:", userId);
        

        try {
            // Llamada a SOAP
            const response = await SoapService.processShareRequest('listSharedDirs', {
                userId
            });

            if (response.success) {
                const parsedData = JSON.parse(response.data);
                return res.status(201).json(parsedData);
            } else {
                return res.status(400).json({ message: 'No se pudieron recuperar las carpetas compartidas' });
            }
        } catch (error) {
            console.error('Error al listar carpetas compartidas:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }
}

export default ShareController;