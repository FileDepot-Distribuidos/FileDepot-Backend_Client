import express from 'express';
const router = express.Router();

// Importamos los controladores
import DirectoryController from '../controllers/directoryController.js';
import FilesController from '../controllers/fileController.js';
import ShareController from '../controllers/shareController.js';
import AuthController from '../controllers/authController.js';

//Rutas de autenticación
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.get('/auth/validate', AuthController.validateJWT);

// Rutas de directorios
router.post('/directories', AuthController.validateJWT, DirectoryController.createDirectory);
router.post('/directories/:directoryID', AuthController.validateJWT, DirectoryController.addSubdirectory);
router.get('/directories', AuthController.validateJWT, DirectoryController.listDirectories);
router.put('/directories/rename', AuthController.validateJWT, DirectoryController.renameDirectory);
router.delete('/directories', AuthController.validateJWT, DirectoryController.deleteDirectory);
router.post('/directories/add-file', AuthController.validateJWT, DirectoryController.addFile);
router.put('/directories/move', AuthController.validateJWT, DirectoryController.moveDirectory);

//Rutas de archivos
router.post('/files', AuthController.validateJWT, FilesController.uploadFile);
router.get('/files/:fileID', AuthController.validateJWT, FilesController.readFile);
router.get('/files/:fileID/download', AuthController.validateJWT, FilesController.downloadFile);
router.put('/files/move', AuthController.validateJWT, FilesController.moveFile);
router.delete('/files', AuthController.validateJWT, FilesController.deleteFile);

//Rutas de compartir archivos y directorios
router.post('/share/file', AuthController.validateJWT, ShareController.shareFile);
router.post('/share/directory', AuthController.validateJWT, ShareController.shareDirectory);
router.put('/share/revoke', AuthController.validateJWT, ShareController.revokeAccess);
router.get('/share/list', AuthController.validateJWT, ShareController.listSharedFiles);

export default router;