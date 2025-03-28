import SoapService from '../services/soapService.js';

class ShareController {
    
    // Compartir un archivo a través de SOAP
    static async shareFile(req, res) {
        try {
            const { sharedWith, sharedBy, sharedFile } = req.body;

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
            const { sharedWith, sharedBy, sharedDirectory } = req.body;

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
        try {
            // Llamada a SOAP
            const response = await SoapService.processShareRequest('listSharedFiles', {});

            if (response.success) {
                return res.status(200).json(response.sharedFiles);
            } else {
                return res.status(400).json({ message: 'No se pudieron recuperar los archivos compartidos' });
            }
        } catch (error) {
            console.error('Error al listar archivos compartidos:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }
}

export default ShareController;