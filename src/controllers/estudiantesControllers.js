import Estudiantes from '../models/Estudiantes.js';
import { Op } from 'sequelize';

// Obtener todos los Estudiantes
const obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiantes.findAll();
    res.status(200).json(estudiantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Obtener un Estudiante por ID
const obtenerEstudiantePorId = async (req, res) => {
  const { id } = req.params;
  try {
    const estudiante = await Estudiantes.findByPk(id);
    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }
    res.status(200).json(estudiante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Crear un nuevo Estudiante
const crearEstudiante = async (req, res) => {
  const { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email } = req.body;
  // Verifica que no haya campos vacíos
  if (!nombre || !apellido || !cedula || !fecha_nacimiento || !ciudad || !direccion || !telefono || !email) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }
  try {
    const estudianteExistente = await Estudiantes.findOne({ where: { cedula } });

    if (estudianteExistente) {
      return res.status(400).json({ mensaje: 'El Estudiante ya está registrado' });
    }

    const nuevoEstudiante = await Estudiantes.create({ nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email });

    res.status(201).json({ mensaje: 'Estudiante registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Actualizar un Estudiante por ID
const actualizarEstudiante = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email } = req.body;

  // Verifica que no haya campos vacíos
  if (!nombre || !apellido || !cedula || !fecha_nacimiento || !ciudad || !direccion || !telefono || !email) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    const estudiante = await Estudiantes.findByPk(id);

    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }

    // Verificar si la cédula ya está en uso por otro paciente (excepto si es la cédula actual del mismo paciente)
    const estudianteExistente = await Estudiantes.findOne({
      where: {
        cedula,
        id: { [Op.not]: id }, // Excluye al Estudiante actual por ID
      },
    });

    if (estudianteExistente) {
      return res.status(400).json({ mensaje: 'La cédula ya está en uso por otro Estudiante' });
    }

    estudiante.nombre = nombre;
    estudiante.apellido = apellido;
    estudiante.cedula = cedula;
    estudiante.fecha_nacimiento = fecha_nacimiento;
    estudiante.ciudad = ciudad;
    estudiante.direccion = direccion;
    estudiante.telefono = telefono;
    estudiante.email = email;

    await estudiante.save();

    res.status(200).json({ mensaje: 'Estudiante actualizado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


// Eliminar un paciente por ID
const eliminarEstudiante = async (req, res) => {
  const { id } = req.params;
  
  try {
    const estudiante = await Estudiantes.findByPk(id);

    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }

    await estudiante.destroy();

    res.status(200).json({ mensaje: 'Estudiante eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

export default{ obtenerPacientes: obtenerEstudiantes, obtenerPacientePorId: obtenerEstudiantePorId, crearPaciente: crearEstudiante, actualizarPaciente: actualizarEstudiante, eliminarPaciente: eliminarEstudiante };
