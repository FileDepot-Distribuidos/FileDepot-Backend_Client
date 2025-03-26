import express from 'express';
const router = express.Router();

// Importamos los controladores
import DirectoryController from '../controllers/directoryController.js';
import FilesController from '../controllers/fileController.js';
import ShareController from '../controllers/shareController.js';
import AuthController from '../controllers/authController.js';

// Middleware de autenticación (opcional, si deseas proteger algunas rutas)
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

    jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });

        req.user = decoded;
        next();
    });
};

//Rutas de autenticación
router.post('/auth/login', AuthController.sendCredentials);
router.get('/auth/validate', authenticate, AuthController.validateJWT);

// Rutas de directorios
router.post('/directories', authenticate, DirectoryController.createDirectory);
router.post('/directories/:directoryID', authenticate, DirectoryController.addSubdirectory);
router.get('/directories', authenticate, DirectoryController.listDirectories);
router.put('/directories/rename', authenticate, DirectoryController.renameDirectory);
router.delete('/directories', authenticate, DirectoryController.deleteDirectory);
router.post('/directories/add-file', authenticate, DirectoryController.addFile);
router.put('/directories/move', authenticate, DirectoryController.moveDirectory);

//Rutas de archivos
router.post('/files', authenticate, FilesController.uploadFile);
router.get('/files/:fileID', authenticate, FilesController.readFile);
router.get('/files/:fileID/download', authenticate, FilesController.downloadFile);
router.put('/files/move', authenticate, FilesController.moveFile);
router.delete('/files', authenticate, FilesController.deleteFile);

//Rutas de compartir archivos y directorios
router.post('/share/file', authenticate, ShareController.shareFile);
router.post('/share/directory', authenticate, ShareController.shareDirectory);
router.put('/share/revoke', authenticate, ShareController.revokeAccess);
router.get('/share/list', authenticate, ShareController.listSharedFiles);

export default router;