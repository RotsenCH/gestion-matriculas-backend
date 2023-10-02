import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import bcrypt from 'bcrypt'; // Importa el paquete bcrypt

class Usuarios extends Model {}

Usuarios.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(60), // Aumenta la longitud para almacenar el hash de la contraseña
    allowNull: false,
  },
}, {
  sequelize, // Debes pasar la instancia de sequelize aquí
  modelName: 'Usuarios', // Nombre del modelo
  hooks: {
    // Hook que se ejecuta antes de crear un nuevo usuario
    beforeCreate: async (usuario) => {
      // Genera un hash de la contraseña antes de almacenarla en la base de datos
      const saltRounds = 10; // Número de rondas de hashing (ajusta según tus necesidades)
      const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);
      usuario.password = hashedPassword;
    },
  },
});

export default Usuarios;
