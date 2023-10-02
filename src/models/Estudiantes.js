import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';

class Estudiantes extends Model {}

Estudiantes.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  cedula: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  ciudad: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  sequelize, // Debes pasar la instancia de sequelize aquí
  modelName: 'Estudiantes', // Nombre del modelo
});

export default Estudiantes;
