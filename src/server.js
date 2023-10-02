// Type module
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import matriculasRoutes from './routes/matriculasRoutes.js'; // Importa las rutas de Citas
import materiasRoutes from './routes/materiasRoutes.js'; // Importa las rutas de Citas
import usuariosRoutes from './routes/usuariosRoutes.js'; // Importa las rutas de Citas
 import estudiantesRoutes from './routes/estudiantesRoutes.js'; // Importa las rutas de Citas

// Inicializaciones
// Inicializar express en la variable app
const app = express();
dotenv.config();

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.use(cors());

// Middlewares
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.status(200).json({
    bienvenida: 'Bienvenido a la API de Gestion de Citas'
  });
});

// Usa las rutas de Citas
app.use('/api', matriculasRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', materiasRoutes);
app.use('/api', estudiantesRoutes);

app.use((req, res) => res.status(404).send('Endpoint no encontrado - 404'));

// Exportación por default de la variable app
export default app;
