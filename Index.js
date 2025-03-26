import express from 'express';
import swaggerDocs from './config/swagger.js';
import Users from './routes/UserRoutes.js';
import clienteRoutes from './routes/ClienteRoutes.js';
import ServicioRoutes from './routes/ServiceRoutes.js';
import EmpleadoRoutes from './routes/EmpleadosRoutes.js';
import ventaRoutes from './routes/VentasRoutes.js';
import citaRoutes from './routes/CitasRoutes.js';
import cors from 'cors'; 

const app = express();


app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors({ origin: '*' })); 

app.use('/api', Users);
app.use('/api', clienteRoutes);
app.use('/api', ServicioRoutes);
app.use('/api', EmpleadoRoutes);
app.use('/api', ventaRoutes);
app.use('/api', citaRoutes);


swaggerDocs(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => { // Cambia 'localhost' por '0.0.0.0'
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
}); 