import express from 'express';
import verificarAutenticacion from '../middlewares/autenticacion.js';
import MateriasController from '../controllers/materiasControllers.js';

const router = express.Router();

router.get('/materias/listar', verificarAutenticacion, MateriasController.obtenerEspecialidades);
router.get('/materias/obtener/:id', verificarAutenticacion, MateriasController.obtenerEspecialidadPorId);
router.post('/materias/crear', verificarAutenticacion, MateriasController.crearEspecialidad);
router.put('/materias/actualizar/:id', verificarAutenticacion, MateriasController.actualizarEspecialidad);
router.delete('/materias/eliminar/:id', verificarAutenticacion, MateriasController.eliminarEspecialidad);

export default router;
