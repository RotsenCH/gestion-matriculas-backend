import Usuarios from '../models/Usuarios.js';
import bcrypt from 'bcrypt';
import generarJWT from '../helpers/crearJWT.js';
import { Op } from 'sequelize';

const registrarUsuario = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  // Validar que los campos no estén vacíos después de eliminar espacios en blanco
  if (!nombre.trim() || !apellido.trim() || !email.trim() || !password.trim()) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    const usuarioExistente = await Usuarios.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya está registrado' });
    }

    await Usuarios.create({ nombre, apellido, email, password });

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


const iniciarSesion = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuarios.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      return res.status(400).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    const token = generarJWT(usuario.id);

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const obtenerPerfil = (req, res) => {
  const { nombre, apellido, email } = req.usuarioBDD;

  res.status(200).json({ nombre, apellido, email });
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll({ attributes: { exclude: ['password'] } });

    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuarios.findByPk(id, { attributes: { exclude: ['password'] } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email } = req.body;

  // Validar que los campos no estén vacíos después de eliminar espacios en blanco
  if (!nombre.trim() || !apellido.trim() || !email.trim()) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    const usuario = await Usuarios.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verificar si el email ya está en uso por otro usuario
    const usuarioExistente = await Usuarios.findOne({
      where: {
        email,
        id: { [Op.not]: id }, // Excluye al usuario actual por ID
      },
    });

    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está en uso por otro usuario' });
    }

    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;

    await usuario.save();

    res.status(200).json({ mensaje: 'Usuario actualizado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuarios.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await usuario.destroy();

    res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

export default {
  registrarUsuario,
  iniciarSesion,
  obtenerPerfil,
  listarUsuarios,
  obtenerUsuarioPorId,
  editarUsuario,
  eliminarUsuario,
};
