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
router.get('/auth/validate', AuthController.validateSession);
router.post('/auth/logout', AuthController.logout);

// Rutas de directorios
router.post('/directories', AuthController.validateJWT, DirectoryController.createDirectory);
router.post('/directories/:directoryID', AuthController.validateJWT, DirectoryController.addSubdirectory);
router.put('/directories/rename', AuthController.validateJWT, DirectoryController.renameDirectory);
router.delete('/directories', AuthController.validateJWT, DirectoryController.deleteDirectory);
router.post('/directories/add-file', AuthController.validateJWT, DirectoryController.addFile);
router.put('/directories/move', AuthController.validateJWT, DirectoryController.moveDirectory);
router.get('/directories', AuthController.validateJWT, DirectoryController.listAllDirectories);
router.get('/directories/dir/:dir', AuthController.validateJWT, DirectoryController.listDirectories);

//Rutas de archivos
router.post('/files', AuthController.validateJWT, FilesController.uploadFile);
router.get('/files/:fileID', AuthController.validateJWT, FilesController.readFile);
router.get('/files/download/:fileID', AuthController.validateJWT, FilesController.downloadFile);
router.get('/files/read/:fileID', AuthController.validateJWT, FilesController.downloadFile);
router.put('/files/move', AuthController.validateJWT, FilesController.moveFile);
router.put('/files/rename', AuthController.validateJWT, FilesController.renameFile);
router.delete('/files', AuthController.validateJWT, FilesController.deleteFile);
router.post('/files/recibe', FilesController.recibirArchivo);
router.get('/files', AuthController.validateJWT, FilesController.listAllFiles);
router.get('/files/dir/:dir', AuthController.validateJWT, FilesController.listFiles);


//Rutas de compartir archivos y directorios
router.post('/share/file', AuthController.validateJWT, ShareController.shareFile);
router.post('/share/directory', AuthController.validateJWT, ShareController.shareDirectory);
router.put('/share/revoke', AuthController.validateJWT, ShareController.revokeAccess);
router.get('/share/list', AuthController.validateJWT, ShareController.listSharedFiles);
router.get('/share/dirList', AuthController.validateJWT, ShareController.listSharedDirs);

export default router;