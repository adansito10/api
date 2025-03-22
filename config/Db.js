import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'EQUIPO7', // Cambia esto al nombre de tu base de datos
  password: process.env.DB_PASSWORD || 'Capistran20324', // Cambia esto a tu contraseña
  port: process.env.DB_PORT || 5432,
});

// Verificar la conexión a PostgreSQL
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error al conectar a PostgreSQL:', err.stack);
    return;
  }
  console.log('¡Conexión exitosa a PostgreSQL!');
  release();
});

export default pool;