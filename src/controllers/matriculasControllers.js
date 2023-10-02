import Matriculas from '../models/Matriculas.js';
import Estudiantes from '../models/Estudiantes.js';
import Materias from '../models/Materias.js';
import { v4 as uuidv4 } from 'uuid'; // Importa la función uuidv4 de la biblioteca uuid

// Obtener todas las citas
const obtenerMatriculas = async (req, res) => {
    try {
        const matriculas = await Matriculas.findAll();
        res.status(200).json(matriculas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

// Obtener una cita por ID
const obtenerMatriculaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const matricula = await Matriculas.findByPk(id);
        if (!matricula) {
            return res.status(404).json({ mensaje: 'Matricula no encontrada' });
        }
        res.status(200).json(matricula);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

// Crear una nueva cita
const crearMatricula = async (req, res) => {
    const { descripcion, id_estudiante, id_materia } = req.body;
  
    try {
      // Verificar si el paciente existe
      const estudianteExistente = await Estudiantes.findByPk(id_estudiante);
  
      if (!estudianteExistente) {
        return res.status(400).json({ mensaje: 'El Estudiante no existe' });
      }
  
      // Verificar si la especialidad existe
      const materiaExistente = await Materias.findByPk(id_materia);
  
      if (!materiaExistente) {
        return res.status(400).json({ mensaje: 'La Materia no existe' });
      }
  
      // Generar un código UUID único
      const codigo = uuidv4();
  
      // Verificar si la cita ya existe para el mismo paciente y especialidad
      const matriculaExistente = await Matriculas.findOne({ where: { id_estudiante, id_materia } });
  
      if (matriculaExistente) {
        return res.status(400).json({ mensaje: 'La Matricula ya está registrada para este estudiante y materia' });
      }
  
      const nuevaMatricula = await Matriculas.create({ codigo, descripcion, id_estudiante, id_materia });
  
      res.status(201).json({ mensaje: 'Matricula registrada con éxito', matricula: nuevaMatricula });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error en el servidor' });
    }
  };
  
  // ...
  
  // Actualizar una cita por ID
  const actualizarMatricula = async (req, res) => {
    const { id } = req.params;
    const { descripcion, id_estudiante, id_materia } = req.body;
  
    try {
      // Verificar si la cita existe
      const matricula = await Matriculas.findByPk(id);
  
      if (!matricula) {
        return res.status(404).json({ mensaje: 'Matricula no encontrada' });
      }
  
      // Verificar si el paciente existe
      const estudianteExistente = await Estudiantes.findByPk(id_estudiante);
  
      if (!estudianteExistente) {
        return res.status(400).json({ mensaje: 'El Estudiante no existe' });
      }
  
      // Verificar si la especialidad existe
      const materiaExistente = await Materias.findByPk(id_materia);
  
      if (!materiaExistente) {
        return res.status(400).json({ mensaje: 'La Materia no existe' });
      }
  
      // Actualizar la cita
      await matricula.update({ descripcion, id_estudiante, id_materia });
  
      res.status(200).json({ mensaje: 'Matricula actualizada con éxito', matricula: matricula });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error en el servidor' });
    }
  };

// Eliminar una cita por ID
const eliminarMatricula = async (req, res) => {
    const { id } = req.params;

    try {
        const matricula = await Matriculas.findByPk(id);

        if (!matricula) {
            return res.status(404).json({ mensaje: 'Matricula no encontrada' });
        }

        await matricula.destroy();

        res.status(200).json({ mensaje: 'Matricula eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

export default {
    obtenerCitas: obtenerMatriculas,
    obtenerCitaPorId: obtenerMatriculaPorId,
    crearCita: crearMatricula,
    actualizarCita: actualizarMatricula,
    eliminarCita: eliminarMatricula,
};
