CREATE TABLE Clientes
(
    id SERIAL PRIMARY KEY,
    rut VARCHAR(10) NOT NULL,
    telefono VARCHAR(12)
)

CREATE TABLE Categorias
(
    id SERIAL PRIMARY KEY NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT    
)

CREATE TABLE Productos
(
    id SERIAL PRIMARY KEY NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio INTEGER NOT NULL,
    stock INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL,
    CONSTRAINT fk_categoria FOREIGN KEY (categoria_id) REFERENCES Categorias(id)
)

CREATE TABLE Ventas
(
    id SERIAL PRIMARY KEY NOT NULL,
    fecha DATE NOT NULL,
    total INTEGER,
    cliente_id INTEGER NOT NULL,
    CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES Clientes(id)
)

CREATE TABLE VentaProducto
(
    id SERIAL PRIMARY KEY NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    venta_id INTEGER NOT NULL,
    CONSTRAINT fk_producto FOREIGN KEY (producto_id) REFERENCES Productos(id),
    CONSTRAINT fk_venta FOREIGN KEY (venta_id) REFERENCES Ventas(id)
)