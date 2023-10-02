import jwt from 'jsonwebtoken';
import Usuarios from '../models/Usuarios.js';

const verificarAutenticacion = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ mensaje: 'Debes proporcionar un token' });
  }

  const { authorization } = req.headers;

  try {
    const { id } = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);
    req.usuarioBDD = await Usuarios.findByPk(id, { attributes: { exclude: ['password'] } });
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Formato de token no válido' });
  }
};

export default verificarAutenticacion;
