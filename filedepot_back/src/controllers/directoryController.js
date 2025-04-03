import SoapService from '../services/soapService.js';


class DirectoryController {
    
    // Crear un nuevo directorio con SOAP
    static async createDirectory(req, res) {
        try {
            const { path, isRoot, parentDirectory } = req.body;

            const response = await SoapService.processDirectoryRequest(
                'createDirectory',
                { path, isRoot, parentDirectory }
            );

            if (response.success) {
                return res.status(201).json(response.directory);
            } else {
                return res.status(400).json({ message: 'Error al crear el directorio' });
            }
        } catch (error) {
            console.error('Error al crear directorio:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }
    // Agregar un subdirectorio usando SOAP
    static async addSubdirectory(req, res) {
        try {
            const { parentDirectory, subdirectory } = req.body;

            const response = await SoapService.processDirectoryRequest(
                'addSubdirectory',
                { parentDirectory, subdirectory }
            );

            if (response.success) {
                return res.status(201).json(response.subdirectory);
            } else {
                return res.status(400).json({ message: 'Error al agregar el subdirectorio' });
            }
        } catch (error) {
            console.error('Error al agregar subdirectorio:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    // Listar directorios con SOAP
    static async listDirectories(req, res) {
        try {
            const response = await SoapService.processDirectoryRequest(
                'listDirectories',
                {} // No se requiere data
            );

            if (response.success) {
                return res.status(200).json(response.directories);
            } else {
                return res.status(400).json({ message: 'No se pudieron listar los directorios' });
            }
        } catch (error) {
            console.error('Error al listar directorios:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    // Renombrar un directorio con SOAP
    static async renameDirectory(req, res) {
        try {
            const { directoryID, newName } = req.body;

            const response = await SoapService.processDirectoryRequest(
                'renameDirectory',
                { directoryID, newName }
            );

            if (response.success) {
                return res.status(200).json({ message: `Directorio ${directoryID} renombrado a ${newName}` });
            } else {
                return res.status(400).json({ message: 'No se pudo renombrar el directorio' });
            }
        } catch (error) {
            console.error('Error al renombrar directorio:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    // Eliminar un directorio con SOAP
    static async deleteDirectory(req, res) {
        try {
            const { directoryID } = req.body;

            const response = await SoapService.processDirectoryRequest(
                'deleteDirectory',
                { directoryID }
            );

            if (response.success) {
                return res.status(200).json({ message: `Directorio ${directoryID} eliminado` });
            } else {
                return res.status(400).json({ message: 'No se pudo eliminar el directorio' });
            }
        } catch (error) {
            console.error('Error al eliminar directorio:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    // Agregar un archivo a un directorio con SOAP
    static async addFile(req, res) {
        try {
            const { directoryID, file } = req.body;

            const response = await SoapService.processDirectoryRequest(
                'addFile',
                { directoryID, file }
            );

            if (response.success) {
                return res.status(201).json(response.file);
            } else {
                return res.status(400).json({ message: 'No se pudo agregar el archivo al directorio' });
            }
        } catch (error) {
            console.error('Error al agregar archivo al directorio:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }

    // Mover un directorio con SOAP
    static async moveDirectory(req, res) {
        try {
            const { directoryID, newParentDirectory } = req.body;

            const response = await SoapService.processDirectoryRequest(
                'moveDirectory',
                { directoryID, newParentDirectory }
            );

            if (response.success) {
                return res.status(200).json({ message: `Directorio ${directoryID} movido a ${newParentDirectory}` });
            } else {
                return res.status(400).json({ message: 'No se pudo mover el directorio' });
            }
        } catch (error) {
            console.error('Error al mover directorio:', error);
            return res.status(500).json({ message: 'Error interno en el servidor' });
        }
    }
}

export default DirectoryController;