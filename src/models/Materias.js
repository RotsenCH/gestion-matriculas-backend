import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';

class Materias extends Model {}

Materias.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  creditos: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
}, {
  sequelize, // Debes pasar la instancia de sequelize aquí
  modelName: 'Materias', // Nombre del modelo
});

export default Materias;
