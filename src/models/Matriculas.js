import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js'; // Asegúrate de que la importación de sequelize sea correcta según tu estructura de archivos
import Materias from './Materias.js'; // Importa el modelo de Pacientes
import Estudiantes from './Estudiantes.js'; // Importa el modelo de Especialidades

class Matriculas extends Model {}

Matriculas.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize, // Debes pasar la instancia de sequelize aquí
    modelName: 'Matriculas', // Nombre del modelo
  }
);

Matriculas.belongsTo(Materias, { foreignKey: 'id_materia' });
Matriculas.belongsTo(Estudiantes, { foreignKey: 'id_estudiante' });


export default Matriculas;
