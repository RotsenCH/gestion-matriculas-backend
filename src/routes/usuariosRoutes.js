import express from 'express';
import UsuariosController from '../controllers/usuariosControllers.js';
import verificarAutenticacion from '../middlewares/autenticacion.js';

const router = express.Router();

// Registro de usuario
router.post('/usuarios/registro', UsuariosController.registrarUsuario);

// Inicio de sesión
router.post('/usuarios/login', UsuariosController.iniciarSesion);

// Ruta protegida que requiere autenticación
router.get('/usuarios/perfil', verificarAutenticacion, UsuariosController.obtenerPerfil);

// Listar todos los usuarios (para administradores, por ejemplo)
router.get('/usuarios/listar', verificarAutenticacion, UsuariosController.listarUsuarios);

// Obtener un solo usuario por ID
router.get('/usuarios/obtener/:id', verificarAutenticacion, UsuariosController.obtenerUsuarioPorId);

// Editar usuario por ID
router.put('/usuarios/editar/:id', verificarAutenticacion, UsuariosController.editarUsuario);

// Eliminar usuario por ID
router.delete('/usuarios/eliminar/:id', verificarAutenticacion, UsuariosController.eliminarUsuario);

export default router;
