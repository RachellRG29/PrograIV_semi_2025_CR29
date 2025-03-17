-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2025 a las 16:58:41
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
(9, 'USSS029394', 'Ezequiel Martinez Argueta', 'Isla el joval', '7764-2333', 'ezquiel@ugb.edu.sv', '2001-03-03', 'Masculino', 'b588da09-f7b9-4d7b-ae8e-6aa1568785f5'),
(8, 'USIS333031', 'Estefani Areli Martinez Argueta', 'San Rafael Oriente', '7764-0012', 'estefany@ugb.edu.sv', '2001-03-28', 'Femenino', '4fe54231-31d3-4a60-b345-56187da1f269'),
(10, 'USIS333030', 'Ana Rosa Martinez Claros', 'Santa Maria', '7660-4233', 'ana@ugb.edu.sv', '2001-03-27', 'Femenino', '387a7309-331d-4e6d-b3c8-376c7ce3fc64'),
(7, 'USSS029920', 'Jose Saul Lopez Jimenez', 'Usulutan santamaria', '7665-2321', 'elias@ugb.edu.sv', '2001-03-20', 'Masculino', '0a0e4e0c-f258-46d1-8ed6-9ff7776b083f');

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

--
-- Volcado de datos para la tabla `docentes`
--

INSERT INTO `docentes` (`idDocente`, `codigo`, `nombre`, `direccion`, `telefono`, `email`, `fechanacimiento`, `sexo`, `codigo_transaccion`) VALUES
(1, 'USSS039922', 'Osmaro Parada Fuentes', 'Ugb El salvador usulutan', '6575-3455', 'oscar@ugb.edu.sv', '1980-01-04', 'Masculino', 'c4ea2c06-b155-470c-b201-714f4672ec8f');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `idMateria` int(10) NOT NULL,
  `codigo` char(5) NOT NULL,
  `nombre` char(100) NOT NULL,
  `uv` tinyint(2) NOT NULL,
  `codigo_transaccion` char(36) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`idMateria`, `codigo`, `nombre`, `uv`, `codigo_transaccion`) VALUES
(0, '0022', 'Programación III', 10, '58601bca-133b-4172-8cc6-ee15be3cc618');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matricula`
--

CREATE TABLE `matricula` (
  `idMatricula` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL,
  `fecha_matricula` date NOT NULL
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
  ADD PRIMARY KEY (`idMateria`),
  ADD UNIQUE KEY `codigo_transaccion` (`codigo_transaccion`);

--
-- Indices de la tabla `matricula`
--
ALTER TABLE `matricula`
  ADD PRIMARY KEY (`idMatricula`),
  ADD KEY `idAlumno` (`idAlumno`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `idAlumno` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `docentes`
--
ALTER TABLE `docentes`
  MODIFY `idDocente` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `matricula`
--
ALTER TABLE `matricula`
  MODIFY `idMatricula` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;