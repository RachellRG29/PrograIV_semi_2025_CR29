-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-03-2025 a las 04:42:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_sistema_academico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `idAlumno` int(10) NOT NULL,
  `codigo` char(15) NOT NULL,
  `nombre` char(75) NOT NULL,
  `direccion` char(150) NOT NULL,
  `telefono` char(25) NOT NULL,
  `email` char(75) NOT NULL,
  `fechanacimiento` date DEFAULT NULL,
  `sexo` enum('Femenino','Masculino') NOT NULL,
  `codigo_transaccion` char(36) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`idAlumno`, `codigo`, `nombre`, `direccion`, `telefono`, `email`, `fechanacimiento`, `sexo`, `codigo_transaccion`) VALUES
(4, 'USIS018804', 'Luis Enrique Hernandez', 'Usu', '2626-4545', 'luis@ugb.edu.sv', NULL, 'Femenino', '993f0858-6e76-4438-93b5-91e1da099a2c'),
(5, 'USSS395029', 'Cindy Rachell Ramirez Garcia', 'Usulutan', '1234-7890', 'cindyramirz@gmail.com', NULL, 'Femenino', 'f55d82c1-b07f-479e-a2bb-4a7a1183535e'),
(6, 'USSE9238022', 'Jonathan Alexander Gonzales', 'Usulutan', '7687-3233', 'jonathin@ugb.edu.sv', NULL, 'Femenino', '3b55ce82-bf18-4424-81a9-a7d8d9d99856');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docentes`
--

CREATE TABLE `docentes` (
  `idDocente` int(10) NOT NULL,
  `codigo` char(15) NOT NULL,
  `nombre` char(75) NOT NULL,
  `direccion` char(150) NOT NULL,
  `telefono` char(25) NOT NULL,
  `email` char(75) NOT NULL,
  `fechanacimiento` date DEFAULT NULL,
  `sexo` enum('Femenino','Masculino') NOT NULL,
  `codigo_transaccion` char(36) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `idMateria` int(10) NOT NULL,
  `codigo` char(5) NOT NULL,
  `nombre` char(100) NOT NULL,
  `uv` tinyint(2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`idAlumno`),
  ADD UNIQUE KEY `codigo_transaccion` (`codigo_transaccion`) USING BTREE;

--
-- Indices de la tabla `docentes`
--
ALTER TABLE `docentes`
  ADD PRIMARY KEY (`idDocente`),
  ADD UNIQUE KEY `codigo_transaccion` (`codigo_transaccion`) USING BTREE;

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`idMateria`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `idAlumno` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `docentes`
--
ALTER TABLE `docentes`
  MODIFY `idDocente` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;