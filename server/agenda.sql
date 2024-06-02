CREATE TABLE `Cursos`(
    `id_curso` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(100) NULL,
    `grado` VARCHAR(20) NULL
);
CREATE TABLE `Anotaciones`(
    `id_anotacion` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `contenido` TEXT NULL,
    `fecha` DATE NULL,
    `id_estudiante` INT NULL,
    `id_profesor` INT NULL
);
CREATE TABLE `Profesores`(
    `id_profesor` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_usuario` INT NULL,
    `especialidad` VARCHAR(100) NULL,
    `fecha_contratacion` DATE NULL
);
CREATE TABLE `Citaciones`(
    `id_citacion` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `fecha` DATE NULL,
    `motivo` TEXT NULL,
    `id_estudiante` INT NULL,
    `id_profesor` INT NULL,
    `id_padre` INT NULL
);
CREATE TABLE `Estudiantes_Padres`(
    `id_estudiante_padre` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_estudiante` INT NULL,
    `id_padre` INT NULL
);
CREATE TABLE `Tareas`(
    `id_tarea` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `titulo` VARCHAR(100) NULL,
    `descripcion` TEXT NULL,
    `fecha_entrega` DATE NULL,
    `id_curso` INT NULL,
    `id_profesor` INT NULL
);
CREATE TABLE `Padres`(
    `id_padre` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_usuario` INT NULL,
    `ocupacion` VARCHAR(100) NULL
);
CREATE TABLE `Apuntes`(
    `id_apunte` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `contenido` TEXT NULL,
    `fecha` DATE NULL,
    `id_estudiante` INT NULL
);
CREATE TABLE `Directores`(
    `id_director` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_usuario` INT NULL,
    `fecha_contratacion` DATE NULL,
    `especialidad` VARCHAR(100) NOT NULL
);
CREATE TABLE `Estudiantes`(
    `id_estudiante` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_usuario` INT NULL,
    `grado` VARCHAR(20) NULL,
    `curso` VARCHAR(20) NULL,
    `id_padre_tutor` INT NULL
);
CREATE TABLE `Usuarios`(
    `id_usuario` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(50) NULL,
    `apellido` VARCHAR(50) NULL,
    `email` VARCHAR(100) NULL,
    `password` VARCHAR(255) NULL,
    `rol` ENUM('') NULL,
    `telefono` VARCHAR(15) NULL,
    `direccion` VARCHAR(255) NULL,
    `fecha_nacimiento` DATE NULL,
    `genero` ENUM('') NULL
);
ALTER TABLE
    `Usuarios` ADD UNIQUE `usuarios_email_unique`(`email`);
CREATE TABLE `Asignaciones_Cursos`(
    `id_asignacion` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_curso` INT NULL,
    `id_estudiante` INT NULL,
    `id_profesor` INT NULL
);
ALTER TABLE
    `Estudiantes_Padres` ADD CONSTRAINT `estudiantes_padres_id_estudiante_foreign` FOREIGN KEY(`id_estudiante`) REFERENCES `Estudiantes`(`id_estudiante`);
ALTER TABLE
    `Estudiantes` ADD CONSTRAINT `estudiantes_id_usuario_foreign` FOREIGN KEY(`id_usuario`) REFERENCES `Usuarios`(`id_usuario`);
ALTER TABLE
    `Estudiantes` ADD CONSTRAINT `estudiantes_id_padre_tutor_foreign` FOREIGN KEY(`id_padre_tutor`) REFERENCES `Usuarios`(`id_usuario`);
ALTER TABLE
    `Asignaciones_Cursos` ADD CONSTRAINT `asignaciones_cursos_id_estudiante_foreign` FOREIGN KEY(`id_estudiante`) REFERENCES `Estudiantes`(`id_estudiante`);
ALTER TABLE
    `Profesores` ADD CONSTRAINT `profesores_id_usuario_foreign` FOREIGN KEY(`id_usuario`) REFERENCES `Usuarios`(`id_usuario`);
ALTER TABLE
    `Citaciones` ADD CONSTRAINT `citaciones_id_profesor_foreign` FOREIGN KEY(`id_profesor`) REFERENCES `Profesores`(`id_profesor`);
ALTER TABLE
    `Anotaciones` ADD CONSTRAINT `anotaciones_id_estudiante_foreign` FOREIGN KEY(`id_estudiante`) REFERENCES `Estudiantes`(`id_estudiante`);
ALTER TABLE
    `Citaciones` ADD CONSTRAINT `citaciones_id_padre_foreign` FOREIGN KEY(`id_padre`) REFERENCES `Padres`(`id_padre`);
ALTER TABLE
    `Anotaciones` ADD CONSTRAINT `anotaciones_id_profesor_foreign` FOREIGN KEY(`id_profesor`) REFERENCES `Profesores`(`id_profesor`);
ALTER TABLE
    `Citaciones` ADD CONSTRAINT `citaciones_id_estudiante_foreign` FOREIGN KEY(`id_estudiante`) REFERENCES `Estudiantes`(`id_estudiante`);
ALTER TABLE
    `Directores` ADD CONSTRAINT `directores_id_usuario_foreign` FOREIGN KEY(`id_usuario`) REFERENCES `Usuarios`(`id_usuario`);
ALTER TABLE
    `Estudiantes_Padres` ADD CONSTRAINT `estudiantes_padres_id_padre_foreign` FOREIGN KEY(`id_padre`) REFERENCES `Padres`(`id_padre`);
ALTER TABLE
    `Apuntes` ADD CONSTRAINT `apuntes_id_estudiante_foreign` FOREIGN KEY(`id_estudiante`) REFERENCES `Estudiantes`(`id_estudiante`);
ALTER TABLE
    `Tareas` ADD CONSTRAINT `tareas_id_curso_foreign` FOREIGN KEY(`id_curso`) REFERENCES `Cursos`(`id_curso`);
ALTER TABLE
    `Padres` ADD CONSTRAINT `padres_id_usuario_foreign` FOREIGN KEY(`id_usuario`) REFERENCES `Usuarios`(`id_usuario`);
ALTER TABLE
    `Asignaciones_Cursos` ADD CONSTRAINT `asignaciones_cursos_id_profesor_foreign` FOREIGN KEY(`id_profesor`) REFERENCES `Profesores`(`id_profesor`);
ALTER TABLE
    `Tareas` ADD CONSTRAINT `tareas_id_profesor_foreign` FOREIGN KEY(`id_profesor`) REFERENCES `Profesores`(`id_profesor`);
ALTER TABLE
    `Asignaciones_Cursos` ADD CONSTRAINT `asignaciones_cursos_id_curso_foreign` FOREIGN KEY(`id_curso`) REFERENCES `Cursos`(`id_curso`);