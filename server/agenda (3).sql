-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2024 a las 16:28:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agenda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anotaciones`
--

CREATE TABLE `anotaciones` (
  `id_anotacion` int(11) NOT NULL,
  `contenido` text DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `id_estudiante` int(11) DEFAULT NULL,
  `id_profesor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apuntes`
--

CREATE TABLE `apuntes` (
  `id_apunte` int(11) NOT NULL,
  `contenido` text DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `id_estudiante` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones_cursos`
--

CREATE TABLE `asignaciones_cursos` (
  `id_asignacion` int(11) NOT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `id_estudiante` int(11) DEFAULT NULL,
  `id_profesor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignaciones_cursos`
--

INSERT INTO `asignaciones_cursos` (`id_asignacion`, `id_curso`, `id_estudiante`, `id_profesor`) VALUES
(4, 7, 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citaciones`
--

CREATE TABLE `citaciones` (
  `id_citacion` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `motivo` text DEFAULT NULL,
  `id_estudiante` int(11) DEFAULT NULL,
  `id_profesor` int(11) DEFAULT NULL,
  `id_padre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citaciones`
--

INSERT INTO `citaciones` (`id_citacion`, `fecha`, `motivo`, `id_estudiante`, `id_profesor`, `id_padre`) VALUES
(1, '2024-05-31', 'NO ASISTE A CLASES\r\n', NULL, NULL, NULL),
(2, '2024-06-20', 'ESCAPO DE CLASES', 5, 1, 1),
(3, '2024-06-05', 'solicitud de entrevista ', 5, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id_curso` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `grado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_curso`, `nombre`, `grado`) VALUES
(1, '1-A', 'Primero'),
(2, '2-A', 'Segundo'),
(3, '3-A', 'Tercero'),
(4, '4-A', 'Cuarto'),
(5, '5-A', 'Quinto'),
(6, '6-A', 'Sexto'),
(7, '7-A', 'Septimo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `directores`
--

CREATE TABLE `directores` (
  `id_director` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_contratacion` date DEFAULT NULL,
  `especialidad` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `directores`
--

INSERT INTO `directores` (`id_director`, `id_usuario`, `fecha_contratacion`, `especialidad`) VALUES
(1, 1, '2024-05-31', 'Mgs. Ingeniria en Sistemas'),
(2, 4, '2010-06-02', 'Ingeniero de Sistemas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id_estudiante` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `grado` varchar(20) DEFAULT NULL,
  `curso` varchar(20) DEFAULT NULL,
  `id_padre_tutor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id_estudiante`, `id_usuario`, `grado`, `curso`, `id_padre_tutor`) VALUES
(1, 3, 'Primero', 'A', NULL),
(2, 17, 'Quinto', NULL, NULL),
(3, 18, 'Cuarto', NULL, NULL),
(4, 19, 'Cuarto', 'A', 1),
(5, 20, 'Septimo', 'A', 1),
(6, 21, 'Septimo', 'A', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes_padres`
--

CREATE TABLE `estudiantes_padres` (
  `id_estudiante_padre` int(11) NOT NULL,
  `id_estudiante` int(11) DEFAULT NULL,
  `id_padre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `padres`
--

CREATE TABLE `padres` (
  `id_padre` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `ocupacion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `padres`
--

INSERT INTO `padres` (`id_padre`, `id_usuario`, `ocupacion`) VALUES
(1, 22, 'GERENTE EJECUTIVO DE BANCO UNION');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `id_profesor` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `fecha_contratacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`id_profesor`, `id_usuario`, `especialidad`, `fecha_contratacion`) VALUES
(1, 2, 'Licenciatura en Informatica y Facultad Tecnologica', '2010-01-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id_tarea` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `id_profesor` int(11) DEFAULT NULL,
  `archivo` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id_tarea`, `titulo`, `descripcion`, `fecha_entrega`, `id_curso`, `id_profesor`, `archivo`) VALUES
(2, 'CALCULAR MRU', 'REALIZAR LOS EJERCICIO 10 AL 20', '2024-06-02', 1, 1, NULL),
(3, 'CALCULAR MRU', 'REALIZAR LOS EJERCICIO 10 AL 20', '2024-06-02', 1, 1, NULL),
(4, 'CALCULAR MRU', 'sd', '2024-06-10', NULL, NULL, NULL),
(5, 'TRABAJO DE INVESTIGACION', 'investigar numero primos', '2024-06-12', 7, 1, NULL),
(6, 'Primero CRUD', 'Realizar dashboard conexion BD', '2024-06-20', 7, 1, NULL),
(7, 'Titulo', 'hacer lo del documentos a', '2024-06-14', 7, 1, NULL),
(8, 'FIsica', 'hacer hasta pagina 3', '2024-06-07', 7, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` enum('') DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `genero` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `email`, `password`, `rol`, `telefono`, `direccion`, `fecha_nacimiento`, `genero`) VALUES
(1, 'Alex', 'Rojas', 'frezzeg568@gmail.com', '$2y$10$9F9qO/PSP7vtzEH4b1yKOuWTRY3In/dj2ub9Qai2NysWqT7lUA33i', '', '77777777', 'Prado Centro de La Paz', '1980-10-10', ''),
(2, 'Pablo', 'Estrada', 'estradaj@gmail.com', '$2a$12$VARuttji7ltufVxRzuItYuP/uzS06EihE/uI7FPE131YSkXx6SLiq', '', '65621234', 'El Alto 16 de Julio', '1995-10-05', ''),
(3, 'Juan', 'Perez', 'juan.perez@gmail.com', '123', '', '123456789', 'Calle Falsa 123', '2000-01-01', ''),
(4, 'fernando', 'Quispe', 'ferleonqaq@gmail.com', '$2y$10$FH2rA7zJ8abzPhea9plOWu.ZSrFuOsuc/93L.pXOH7IwTHoGq.16u', '', '77717711', 'Centro de La Paz - Prado', '2000-10-17', ''),
(8, 'Juan ', 'Mamani', 'prueba@gmail.com', '$2y$10$QxFPWvx7HSfts4q2nU2HnOo7zz8U1wuqoaRMIzDxqA.v0xAmo5gb2', '', '77887788', 'Calle', '2000-03-06', ''),
(9, 'Juan', 'pedro', 'code@gmail.com', '$2y$10$W8EMtnbWgAwjLf8mxjJEgea.Z2T4oEbiU/bu53qKFW.uuH1ERFkeu', '', '77887788', 'Calle', '2024-05-29', ''),
(15, 'Kevin', 'Alex', 'frezzeg@gmail.com', '$2y$10$Ay.3J6GYoPEDUWt4rtQjzuPR3/h.ATXQQX0y7gJ8OKB7AR.ihvL8y', '', '77513397', 'Zona Central Prado', '2024-06-10', ''),
(16, 'Juan', 'Mamani', 'est@gmail.com', '$2y$10$p1k5ORuw1r1ywdiFIXiZguWrlQTKZ63WyMpgoYVt0RLF2Jfzm.Ii6', '', '77887788', 'Calle', '2012-02-09', ''),
(17, 'alex', 'alex', 'est2@gmail.com', NULL, '', '78787817', 'Prado', '2015-01-07', ''),
(18, 'Jose', 'jose', 'jose@gmail.com', '12345', NULL, '1010101010', 'Cnetro', '2010-10-05', 'M'),
(19, 'alex', NULL, 'estudiante@gmail.com', '12345', '', '77887788', 'Calle 2 ramos', '2015-07-29', ''),
(20, 'Rodri', 'aryan', 'rodri@gmail.com', '$2a$10$sIkwkPCpBIecw3VK3bUDneZ12oChkHRNJbwt1SouIyZmhi823qFP6', '', '77887711', 'Calle 2 ramos Prado', '2013-06-29', 'M'),
(21, 'Angel', NULL, 'angel@gmail.com', '$2y$10$zZtD55OQZsCf3p91imL.w.8x0xcqbHpz2SitmRuXOmQwhv1Dpb6gS', '', '77887722', 'Calle 2 ramos Prado la paz', '2013-06-29', 'M'),
(22, 'Pedro', 'Salazar', 'salazar@gmail.com', '$2y$10$jpPurwVI75CoJlvFFA6UL.5sxqEIQguGvit8lFBP8QmdE7qJ/rebO', '', '8787812', 'Calacoto san miguel', '1987-08-05', 'M'),
(23, 'fernando', 'leon', 'fernando@gmail.com', '$2y$10$ztwciB682D6IeVlOEZi8NORsZXtdUI0GDrmarSuqtj7.M8qK6wLlO', '', '76574068', 'sanitiago I', '2001-10-05', 'M');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anotaciones`
--
ALTER TABLE `anotaciones`
  ADD PRIMARY KEY (`id_anotacion`),
  ADD KEY `anotaciones_id_estudiante_foreign` (`id_estudiante`),
  ADD KEY `anotaciones_id_profesor_foreign` (`id_profesor`);

--
-- Indices de la tabla `apuntes`
--
ALTER TABLE `apuntes`
  ADD PRIMARY KEY (`id_apunte`),
  ADD KEY `apuntes_id_estudiante_foreign` (`id_estudiante`);

--
-- Indices de la tabla `asignaciones_cursos`
--
ALTER TABLE `asignaciones_cursos`
  ADD PRIMARY KEY (`id_asignacion`),
  ADD KEY `asignaciones_cursos_id_estudiante_foreign` (`id_estudiante`),
  ADD KEY `asignaciones_cursos_id_profesor_foreign` (`id_profesor`),
  ADD KEY `asignaciones_cursos_id_curso_foreign` (`id_curso`);

--
-- Indices de la tabla `citaciones`
--
ALTER TABLE `citaciones`
  ADD PRIMARY KEY (`id_citacion`),
  ADD KEY `citaciones_id_profesor_foreign` (`id_profesor`),
  ADD KEY `citaciones_id_padre_foreign` (`id_padre`),
  ADD KEY `citaciones_id_estudiante_foreign` (`id_estudiante`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id_curso`);

--
-- Indices de la tabla `directores`
--
ALTER TABLE `directores`
  ADD PRIMARY KEY (`id_director`),
  ADD KEY `directores_id_usuario_foreign` (`id_usuario`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id_estudiante`),
  ADD KEY `estudiantes_id_usuario_foreign` (`id_usuario`),
  ADD KEY `estudiantes_id_padre_tutor_foreign` (`id_padre_tutor`);

--
-- Indices de la tabla `estudiantes_padres`
--
ALTER TABLE `estudiantes_padres`
  ADD PRIMARY KEY (`id_estudiante_padre`),
  ADD KEY `estudiantes_padres_id_estudiante_foreign` (`id_estudiante`),
  ADD KEY `estudiantes_padres_id_padre_foreign` (`id_padre`);

--
-- Indices de la tabla `padres`
--
ALTER TABLE `padres`
  ADD PRIMARY KEY (`id_padre`),
  ADD KEY `padres_id_usuario_foreign` (`id_usuario`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id_profesor`),
  ADD KEY `profesores_id_usuario_foreign` (`id_usuario`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id_tarea`),
  ADD KEY `tareas_id_curso_foreign` (`id_curso`),
  ADD KEY `tareas_id_profesor_foreign` (`id_profesor`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `usuarios_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anotaciones`
--
ALTER TABLE `anotaciones`
  MODIFY `id_anotacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `apuntes`
--
ALTER TABLE `apuntes`
  MODIFY `id_apunte` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `asignaciones_cursos`
--
ALTER TABLE `asignaciones_cursos`
  MODIFY `id_asignacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `citaciones`
--
ALTER TABLE `citaciones`
  MODIFY `id_citacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `directores`
--
ALTER TABLE `directores`
  MODIFY `id_director` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `estudiantes_padres`
--
ALTER TABLE `estudiantes_padres`
  MODIFY `id_estudiante_padre` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `padres`
--
ALTER TABLE `padres`
  MODIFY `id_padre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id_profesor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `anotaciones`
--
ALTER TABLE `anotaciones`
  ADD CONSTRAINT `anotaciones_id_estudiante_foreign` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`),
  ADD CONSTRAINT `anotaciones_id_profesor_foreign` FOREIGN KEY (`id_profesor`) REFERENCES `profesores` (`id_profesor`);

--
-- Filtros para la tabla `apuntes`
--
ALTER TABLE `apuntes`
  ADD CONSTRAINT `apuntes_id_estudiante_foreign` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

--
-- Filtros para la tabla `asignaciones_cursos`
--
ALTER TABLE `asignaciones_cursos`
  ADD CONSTRAINT `asignaciones_cursos_id_curso_foreign` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`),
  ADD CONSTRAINT `asignaciones_cursos_id_estudiante_foreign` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`),
  ADD CONSTRAINT `asignaciones_cursos_id_profesor_foreign` FOREIGN KEY (`id_profesor`) REFERENCES `profesores` (`id_profesor`);

--
-- Filtros para la tabla `citaciones`
--
ALTER TABLE `citaciones`
  ADD CONSTRAINT `citaciones_id_estudiante_foreign` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`),
  ADD CONSTRAINT `citaciones_id_padre_foreign` FOREIGN KEY (`id_padre`) REFERENCES `padres` (`id_padre`),
  ADD CONSTRAINT `citaciones_id_profesor_foreign` FOREIGN KEY (`id_profesor`) REFERENCES `profesores` (`id_profesor`);

--
-- Filtros para la tabla `directores`
--
ALTER TABLE `directores`
  ADD CONSTRAINT `directores_id_usuario_foreign` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `estudiantes_id_padre_tutor_foreign` FOREIGN KEY (`id_padre_tutor`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `estudiantes_id_usuario_foreign` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `estudiantes_padres`
--
ALTER TABLE `estudiantes_padres`
  ADD CONSTRAINT `estudiantes_padres_id_estudiante_foreign` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`),
  ADD CONSTRAINT `estudiantes_padres_id_padre_foreign` FOREIGN KEY (`id_padre`) REFERENCES `padres` (`id_padre`);

--
-- Filtros para la tabla `padres`
--
ALTER TABLE `padres`
  ADD CONSTRAINT `padres_id_usuario_foreign` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `profesores_id_usuario_foreign` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_id_curso_foreign` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`),
  ADD CONSTRAINT `tareas_id_profesor_foreign` FOREIGN KEY (`id_profesor`) REFERENCES `profesores` (`id_profesor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
