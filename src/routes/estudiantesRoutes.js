import express from 'express';
import verificarAutenticacion from '../middlewares/autenticacion.js';
import EstudiantesController from '../controllers/estudiantesControllers.js';

const router = express.Router();

router.get('/estudiantes/listar', verificarAutenticacion, EstudiantesController.obtenerPacientes);
router.get('/estudiantes/obtener/:id',verificarAutenticacion, EstudiantesController.obtenerPacientePorId);
router.post('/estudiantes/crear',verificarAutenticacion, EstudiantesController.crearPaciente);
router.put('/estudiantes/actualizar/:id',verificarAutenticacion, EstudiantesController.actualizarPaciente);
router.delete('/estudiantes/eliminar/:id',verificarAutenticacion, EstudiantesController.eliminarPaciente);

export default router;