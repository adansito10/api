-- Tabla de Clientes
CREATE TABLE CLIENTES (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    email VARCHAR(100),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP,
    delete_at TIMESTAMP
);
-- DROP TABLE CITAS;
-- Tabla de Citas
CREATE TABLE CITAS (
    id SERIAL PRIMARY KEY,
    fecha_cita DATE,
    ubicacion VARCHAR(255),
    id_cliente INTEGER REFERENCES CLIENTES(id) ON DELETE SET NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP,
    delete_at TIMESTAMP
);

-- Tabla de Empleados
CREATE TABLE EMPLEADOS (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    RFC VARCHAR(13),
    telefono VARCHAR(20),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP,
    delete_at TIMESTAMP
);

-- Tabla de Usuarios
CREATE TABLE USUARIOS (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    contrasena VARCHAR(255),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP,
    delete_at TIMESTAMP
);


-- Tabla de Servicios
CREATE TABLE SERVICIOS (
    id SERIAL PRIMARY KEY,
    nombre_servicio VARCHAR(255) NOT NULL,
    tipo_servicio VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP,
    delete_at TIMESTAMP
);
-- SELECT * FROM ventas;
-- Tabla de Ventas
CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    monto NUMERIC(10, 2) NOT NULL,
    id_cliente INT REFERENCES CLIENTES(id) ON DELETE CASCADE,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP,
    delete_at TIMESTAMP
);


-- Insertar clientes
/*INSERT INTO CLIENTES (nombre, apellidos, direccion, telefono, email) VALUES
('Juan', 'Pérez García', 'Calle 123, Ciudad A', '555-1234', 'juan.perez@gmail.com'),
('María', 'López Hernández', 'Avenida B #456, Ciudad B', '555-5678', 'maria.lopez@hotmail.com'),
('Carlos', 'Ramírez Soto', 'Colonia C, Ciudad C', '555-9101', 'carlos.ramirez@yahoo.com');

-- Insertar servicios
INSERT INTO SERVICIOS (nombre_servicio, tipo_servicio, ubicacion, precio) VALUES
('Limpieza básica', 'Limpieza', 'Sucursal A', 500.00),
('Mantenimiento', 'Reparación', 'Sucursal B', 700.00),
('Limpieza profunda', 'Limpieza', 'Sucursal C', 450.00);

-- Insertar citas
INSERT INTO CITAS (fecha_cita, ubicacion, id_cliente) VALUES
('2024-11-15', 'Sucursal A', 1),
('2024-11-16', 'Sucursal B', 2);

-- Insertar empleados
INSERT INTO EMPLEADOS (nombre, apellidos, RFC, telefono) VALUES
('Pedro', 'González Morales', 'PED1234567890', '555-2233');
INSERT INTO EMPLEADOS (nombre, apellidos, RFC, telefono) VALUES
('Carlos', 'Hernandez Trejo', 'CHT4342567890', '553-2233');
INSERT INTO EMPLEADOS (nombre, apellidos, RFC, telefono) VALUES
('Chidalgo', 'Perez Castillo', 'CPC1234576832', '525-2533');

-- Insertar ventas
INSERT INTO ventas (monto, id_cliente) VALUES
(1500.50, 1),
(2300.75, 2),
(1200.00, 3);

-- SELECT * FROM USUARIOS;

-- Insertar usuarios
INSERT INTO USUARIOS (nombre, correo, contrasena) VALUES
('Juan Pérez', 'juan.perez@example.com', 'contraseña123'),
('Ana López', 'ana.lopez@example.com', 'anaPassword'),
('Carlos García', 'carlos.garcia@example.com', 'carlos1234'),
('María Hernández', 'maria.hernandez@example.com', 'mariaPass'),
('José Martínez', 'jose.martinez@example.com', 'joseSecure'),
('Laura Sánchez', 'laura.sanchez@example.com', 'lauraSafe');

ALTER TABLE USUARIOS ALTER COLUMN id_rol DROP NOT NULL;
ALTER TABLE USUARIOS DROP COLUMN id_rol;
DROP TABLE IF EXISTS CLIENTES;
DROP TABLE CLIENTES CASCADE;
ALTER TABLE CITAS RENAME COLUMN id_cliente TO idcliente;
ALTER TABLE CITAS RENAME COLUMN fechacita TO fecha_cita;
ALTER TABLE CITAS RENAME COLUMN idcliente TO id_cliente;*/