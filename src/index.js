import app from './server.js';
import sequelize from './database.js'; // Importa la instancia de Sequelize

// Sincroniza la base de datos y luego inicia el servidor
sequelize.sync()
  .then(() => {
    const port = app.get('port');
    app.listen(port, () => {
      console.log(`Servidor en ejecución en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
