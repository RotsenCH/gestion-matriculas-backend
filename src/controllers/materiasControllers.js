import Materias from '../models/Materias.js';
import { v4 as uuidv4 } from 'uuid'; // Importa la función uuidv4 de la biblioteca uuid
import { Op } from 'sequelize';
// Obtener todas las especialidades
const obtenerMaterias = async (req, res) => {
  try {
    const materias = await Materias.findAll();
    res.status(200).json(materias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Obtener una especialidad por ID
const obtenerMateriasPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const materia = await Materias.findByPk(id);
    if (!materia) {
      return res.status(404).json({ mensaje: 'Especialidad no encontrada' });
    }
    res.status(200).json(materia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Crear una nueva especialidad
const crearMaterias = async (req, res) => {
  const { nombre, descripcion, creditos } = req.body;

  try {
    if (!nombre || !descripcion|| !creditos) {
      return res.status(400).json({ mensaje: 'Por favor, complete todos los campos' });
    }

    // Verificar si la especialidad ya existe por nombre
    const materiaExistente = await Materias.findOne({ where: { nombre } });

    if (materiaExistente) {
      return res.status(400).json({ mensaje: 'La materia ya está registrada' });
    }

    // Generar un código UUID único
    const codigo = uuidv4();

    const nuevaMateria = await Materias.create({ codigo, nombre, descripcion, creditos });

    res.status(201).json({ mensaje: 'Materia registrada con éxito', materia: nuevaMateria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Actualizar una especialidad por ID
const actualizarMateria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, creditos } = req.body;

  try {
    if (!nombre || !descripcion|| !creditos) {
      return res.status(400).json({ mensaje: 'Por favor, complete todos los campos' });
    }

    const materia = await Materias.findByPk(id);

    if (!materia) {
      return res.status(404).json({ mensaje: 'Materia no encontrada' });
    }

    // Verificar si la especialidad ya existe por nombre
    const materiaExistente = await Materias.findOne({
      where: { nombre },
      // Excluye la especialidad actual por ID para permitir la actualización
      where: { id: { [Op.not]: id } },
    });

    if (materiaExistente) {
      return res.status(400).json({ mensaje: 'La materia ya está registrada' });
    }

    await materia.update({ nombre, descripcion, creditos });

    res.status(200).json({ mensaje: 'Materia actualizada con éxito', materia: materia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Eliminar una especialidad por ID
const eliminarMateria = async (req, res) => {
  const { id } = req.params;

  try {
    const materia = await Materias.findByPk(id);

    if (!materia) {
      return res.status(404).json({ mensaje: 'Materia no encontrada' });
    }

    await materia.destroy();

    res.status(200).json({ mensaje: 'Materia eliminada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

export default {
  obtenerEspecialidades: obtenerMaterias,
  obtenerEspecialidadPorId: obtenerMateriasPorId,
  crearEspecialidad: crearMaterias,
  actualizarEspecialidad: actualizarMateria,
  eliminarEspecialidad: eliminarMateria,
};
