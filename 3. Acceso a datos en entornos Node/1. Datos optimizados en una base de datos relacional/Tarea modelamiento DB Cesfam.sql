CREATE DATABASE CESFAM

CREATE TABLE Especialidad
(
    id serial primary key not null,
    codigo CHARACTER(20) not null,
    descripcion text
);

CREATE TABLE Medico 
(
    rut CHARACTER(10) primary key not null,
    nombre text not null,
    direccion text,
    especialidad_id integer not null, 
    CONSTRAINT fk_especialidad FOREIGN KEY(especialidad_id) REFERENCES Especialidad(id)
);

CREATE TABLE Paciente
(
    rut CHARACTER(10) primary key not null,
    nombre text not null,
    direccion text
);

CREATE TABLE BoxConsulta
(
    id serial primary key not null,
    numero int not null
);

CREATE TABLE Consulta
(
    id serial primary key not null,
    fecha_consulta date not null,
    hora_consulta TIME not null,
    rut_paciente CHARACTER(10) not null,
    rut_medico CHARACTER(10) not null,
    box_id integer,
    CONSTRAINT fk_paciente FOREIGN KEY(rut_paciente) REFERENCES Paciente(rut),
    CONSTRAINT fk_medico FOREIGN KEY(rut_medico) REFERENCES Medico(rut),
    CONSTRAINT fk_box FOREIGN KEY(box_id) REFERENCES BoxConsulta(id)
);

CREATE TABLE Licencia
(
    id serial primary key not null,
    codigo CHARACTER(20) not null,
    diagnostico text,
    fecha_inicio date not null,
    fecha_termino date not null,
    id_consulta integer not null,
    CONSTRAINT fk_consulta FOREIGN KEY(id_consulta) REFERENCES Consulta(id)
);