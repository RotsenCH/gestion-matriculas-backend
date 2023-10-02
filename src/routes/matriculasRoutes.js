import express from 'express';
import verificarAutenticacion from '../middlewares/autenticacion.js';
import MatriculasController from '../controllers/matriculasControllers.js';

const router = express.Router();

router.get('/matriculas/listar', verificarAutenticacion, MatriculasController.obtenerCitas);
router.get('/matriculas/obtener/:id', verificarAutenticacion, MatriculasController.obtenerCitaPorId);
router.post('/matriculas/crear', verificarAutenticacion, MatriculasController.crearCita);
router.put('/matriculas/actualizar/:id', verificarAutenticacion, MatriculasController.actualizarCita);
router.delete('/matriculas/eliminar/:id', verificarAutenticacion, MatriculasController.eliminarCita);

export default router;