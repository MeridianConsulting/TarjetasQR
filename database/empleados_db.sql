-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-11-2025 a las 22:40:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `empleados_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'WILLIAM', 'WILLIAM2025*', '2024-12-27 21:13:33', '2025-01-10 20:42:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `Id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `cargo` varchar(100) DEFAULT NULL,
  `numero_telefonico` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `compania` varchar(100) DEFAULT NULL,
  `telefono_empresa` varchar(20) DEFAULT NULL,
  `telefono_internacional` varchar(20) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`Id`, `nombre`, `cargo`, `numero_telefonico`, `email`, `compania`, `telefono_empresa`, `telefono_internacional`, `imageUrl`) VALUES
(331789, 'GLADYS EVANGELINA TABARES PEREZ', 'Profesional senior', NULL, 'gladys.tabares@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(478731, 'ZENAIDA DEL VALLE MARCANO DE VILLARROEL', 'Profesional senior', '3057684591', 'zenaida.marcano@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(506169, 'CLAUDIA CAROPRESE GARCIA', 'Profesional senior', NULL, 'claudia.caroprese@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1160627, 'DANIEL CLAUDIO PEREZ', 'Profesional senior', '3004281249', 'daniel.perez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(7161987, 'CARLOS SAUL CELIS ACERO', 'Supervisor integral en intervenciones a pozo tipo i', NULL, 'celiscarloss@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(7317575, 'YORGUIN DANIEL PEÑA LUGO', 'Supervisor integral en intervenciones a pozo tipo ii', NULL, 'yorguinp@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(7729979, 'LEONARDO   FRANCO GRAJALES', 'Profesional senior', '3012641268', 'leonardo.franco@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(13481943, 'Juan Carlos Duran Zapata', 'Supervisor integral en intervenciones a pozo tipo i', NULL, 'juan.duran@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(13720871, 'MARIO AUGUSTO MORENO CASTELLANOS', 'Profesional especialista', NULL, 'mario.moreno@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(13740129, 'JULIO CESAR FIGUEROA VEGA', 'Profesional senior', '3022586566', 'julio.figueroa@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(13871188, 'PEDRO RAFAEL CADENA ORDOÑEZ', 'Supervisor integral en intervenciones a pozo tipo i', NULL, 'pedro.cadena@outlook.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(13959717, 'DIEGO FERNANDO GALEANO BARRERA', 'Profesional senior', NULL, 'diego.galeano@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(18760161, 'RICARDO JOSÉ CORREA CERRO', 'Supervisor integral en intervenciones a pozo tipo ii', NULL, 'ricardocorreacerro@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(30400528, 'BLANCA OFFIR HURTADO LOPERA', 'Profesional senior', '525521915514', 'blanca.hurtado@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(30405867, 'DIANA MARCELA CÁCERES SALINAS', 'Profesional junior', '3203003436', 'diana.caceres@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(31429767, 'LINA MARIA RENDON CARDONA', 'Profesional senior', '3243231371', 'lina.rendon@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(37514608, 'LUCIA MARIA ACERO LIZCANO', 'Profesional junior', '3112381241', 'lucia.acero@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(37949169, 'JENNY ANDREA CIPAGAUTA CARDOZO', 'Profesional junior', NULL, 'andrea.cipagauta@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(39949703, 'ANA EBELIA GAMEZ FIGUEREDO', 'Contador senior', NULL, 'contador@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(40936668, 'ESPERANZA DE JESUS COTES LEON', 'Profesional junior', '3183728370', 'esperanza.cotes@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(43578774, 'ALEJANDRA ARBELAEZ LONDOÑO', 'Profesional senior', '3006163730', 'alejandra.arbelaez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(43728382, 'ALEXANDRA ISABEL MESA CARDENAS', 'Profesional especialista', '3102046026', 'alexandra.mesa@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(51781946, 'GLORIA FERNANDA VIDAL GONZALEZ', 'Profesional senior', NULL, 'gloria.vidal@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(52005033, 'ZANDRA PATRICIA MAYORGA GOMEZ', 'Coordinador contable y financiero', NULL, 'coordinadoracontable@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(52030991, 'NORA GISELL MORENO MORENO', 'Gerente administrativa y financiera', NULL, 'nmoreno@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(52147279, 'RUTH MUÑOZ CASTILLO', 'Servicios generales', NULL, 'rmunoz@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(52423689, 'NUBIA SOLANLLY REYES ÁVILA', 'Profesional senior', NULL, 'nubia.reyes@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(52455261, 'ANA MARIA CASTELLANOS BARRETO', 'Profesional senior', NULL, 'ana.castellanos@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(52786386, 'PAOLA ADRIANA GIL CHIPATECUA', 'Coordinador de proyectos', '3174365326', 'cordinadorproyectos@meridian.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(52844528, 'EDNA MILED NIÑO OROZCO', 'Profesional especialista', '3112978636', 'edna.nino@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(52967140, 'DIANA PAOLA SOLANO SUA', 'Profesional senior', '3015808137', 'diana.solano@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(52978024, 'ERIKA LILIANA MANCIPE RODRIGUEZ', 'Aprendiz etapa practica', NULL, 'aprendizhseq@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(53103915, 'MONICA DEL PILAR MARTINEZ VERA', 'Profesional senior', '3028018043', 'monica.martinez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(56078704, 'MARIA CLAUDIA OROZCO CUJIA\n', 'Profesional junior', '3214032199', 'maria.orozco@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(63501053, 'MARYLUZ SANTAMARIA BECERRA', 'Servicio especializado en costos de intervencion de pozos tipo i', NULL, 'maryluzsantamaria@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(63527981, 'INA YADITH SERRANO LASTRE', 'Profesional senior', NULL, 'ina.serrano@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(63536247, 'JULLY MARCELA ORTEGON BARRERA', 'Profesional senior', NULL, 'jully.ortegon@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(63540751, 'ADRIANA PATRICIA DUEÑES GARCÉS', 'Profesional especialista', NULL, 'adriana.duenes@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(73188189, 'CARLOS ANTONIO FONTALVO CARRASCAL', 'Supervisor Integral En Intervenciones A Pozo Tipo III', NULL, 'carlosfontalvocarrascal@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(75101511, 'JORGE EDUARDO PAIBA ALZATE', 'Profesional senior', '3155056633', 'jorge.paiba@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(79490148, 'CESAR AUGUSTO URREGO AVENDAÑO', 'Subgerente', NULL, 'currego@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(79613401, 'WILLIAM AUGUSTO FRANCO CASTELLANOS', 'Gerente general', '3138174050', 'wfranco@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(79686130, 'RICARDO GAVIRIA GARCIA', 'Profesional senior', NULL, 'ricardo.gaviria@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(79954907, 'RONALD VASQUEZ ZARATE', 'Analista de nomina y contratacion', NULL, 'nominas@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(80076686, 'ALEX JHOAN GONZALEZ MORA', 'Ingeniero de intervencion a pozos tipo ii', NULL, 'ing.alexgonzalez@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(80100600, 'LUIS GUILLERMO MERCADO RICO', 'Supervisor integral en intervenciones a pozo tipo ii', NULL, 'luis.guillermo.mercado@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(80150738, 'WILBER CASTAÑEDA CASTAÑEDA', 'Servicio especializado en integridad de pozos tipo i', NULL, 'wilbercastaeda@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(80243783, 'DIEGO MAURICIO MARTINEZ BRAVO', 'Profesional senior', NULL, 'diego.martinez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(80417936, 'RAFAEL ALBERTO GUATAME APONTE', '36', NULL, 'rguatame@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(80883010, 'OVEIMAR SANTAMARIA TORRES', 'Profesional senior', NULL, 'oveimar.santamaria@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(83042295, 'WILLIAM CABRERA CASTRO', 'Profesional senior', NULL, 'wcabrera@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(88278069, 'EDGARD MAURICIO ALVAREZ FRANCO', 'Servicio especializado en costos de intervencion de pozos tipo ii', '3162502207', 'GENIOALV@GMAIL.COM', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(88281896, 'JULIO CESAR ROMERO AREVALO', 'Supervisor Integral en Intervenciones a Pozo', NULL, 'julio.romero@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(91207387, 'FERNANDO LOPEZ PRADA', '49', NULL, 'ferlopra@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(91278467, 'ALVARO JAVIER FORERO VILLAMIZAR', '50', NULL, 'dafe.09@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(91514446, 'GERMAN DARIO OREJARENA ESCOBAR', 'Profesional senior', NULL, 'german.orejarena@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(91520047, 'JESUS DAVID ARENAS NAVARRO', 'Profesional junior', '3183544282', 'jesus.arenas@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(91524899, 'JOSÉ ANDRÉS ANAYA MANCIPE', 'Profesional junior', NULL, 'andres.anaya@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(91532360, 'MAURICIO ANDRES VASQUEZ PINTO', 'Profesional senior', NULL, 'mauricio.vasquez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(98772810, 'OSCAR FABIAN RAMIREZ JARAMILLO', 'Profesional senior', NULL, 'oscar.ramirez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1000514435, 'ANGIE PAOLA FORERO MÉNDEZ', 'Asistente contable', NULL, 'apfm514@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1000588440, 'LUISA FERNANDA PACHECO RUBIO', 'Analista de Gestion Humana', NULL, 'analistagh@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1000931984, 'KAREN JULIETH CARRANZA RODRIGUEZ', 'Analista contable', NULL, 'analistacontable@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1002465061, 'DIANIS CHAVEZ CAMPUZANO', 'Servicio especializado en integridad de pozos tipo ii', '4014063067', '01dianischavez@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1003934174, 'JHON ABELARDO CUESTA ASPRILLA', 'Profesional junior', '3218467737', 'jhon.cuesta@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1007493802, 'MICHAEL STIVEN RUIZ CARO', 'Soporte hseq ii', NULL, 'soportehseqproyectos@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1007555164, 'SERGIO FERNANDO POVEDA SALAZAR', 'Profesional básico', '3015198066', 'sergio.poveda@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1007627524, 'ANDRES CAMILO CARDENAS REYES', 'Profesional soporte it', NULL, 'soporteit.nivel1@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1007647736, 'SONIA STEPHANIA FONSECA LOPEZ', 'Asistente de nomina y contratacion', NULL, 'contratacion@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1010056001, 'EMELI YOHANA YACELGA CHITAN', 'Profesional junior', NULL, 'Emeli.yacelga@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1010167959, 'FRANKLIN ALEJANDRO BOTERO RIVERA', 'Profesional senior', NULL, 'alejandro.botero@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1010174163, 'JORGE ARMANDO PACHECO COLLAZOS', 'Asistente logistico administrativo', NULL, 'asistentelogistica@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1010222610, 'JESSICA ALEXANDRA ALAVA CHAVEZ', 'Aprendiz etapa lectiva', NULL, 'jessica.a.alava@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1011202252, 'JOSÉ MATEO LÓPEZ CIFUENTES', 'Desarrollador de software', NULL, 'desarrolloit@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1013629348, 'Christian Camilo Rivera Sánchez', 'Profesional Senior', NULL, 'christian.rivera@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1013633604, 'GUSTAVO ANDRES  BAUTISTA VELANDIA', 'Profesional junior', NULL, 'andresbautistavelandia@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1013634120, 'EDWIN FABIAN MAYORGA LOPEZ', 'Profesional junior', '3114985755', 'edwin.mayorga@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1014180459, 'SANDRA MILENA FLOREZ PRADO', 'Asistente administrativa y de gestión humana', NULL, 'asistenteadministrativo2@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1014181943, 'ANDRES MAURICIO GONZALEZ HERRERA', 'Ingeniero de intervencion a pozos tipo iii', NULL, 'amaogh@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1014216060, 'CARLOS ALEJANDRO FORERO PEÑA', 'Profesional senior', NULL, 'carlos.forero@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1014251428, 'AURA ALEJANDRA CONTRERAS TORRES', 'Asistente administrativo', NULL, 'asistenteadministrativo1@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1014262113, 'MARÍA ANGÉLICA PRADA FONSECA', 'Profesional junior', NULL, 'angelica.prada@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1015475289, 'MIGUEL ANGEL RIAÑO MOLINA', 'Ingeniero asistente de supervision integral de pozos tipo ii', NULL, 'miguelmolinave@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1016037506, 'PAOLA ANDREA GOMEZ CABRERA', 'Profesional junior', NULL, 'paola.gomez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1017211010, 'MARIA ALEJANDRA  GIRALDO MUÑOZ', 'Profesional senior', NULL, 'maria.giraldo@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1018411794, 'JENNYFER PAOLA SANCHEZ PINZON', 'Asistente contable', NULL, 'asistentecontable1@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1018516821, 'LUISA MARIA MELO RODRÍGUEZ', 'Auxiliar contable', NULL, 'luisamrdz22@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1019011177, 'LEIDY JOHANNA BELLO AREVALO', 'Profesional junior', '3142420913', 'leidy.bello@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1019136436, 'LADY LORENA VINCHERY SOLANO', 'Aprendiz etapa practica', NULL, 'auxiliargh@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1020427784, 'JUAN SEBASTIAN VALENCIA ORTEGA', 'Servicio especializado en integridad de pozos tipo ii', NULL, 'Juanseb89@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1020733194, 'ELOY GABRIEL GOMEZ REYES', 'Profesional de Gestión Humana', NULL, 'profesionalgh@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1020792684, 'JORGE FELIPE ALARCON TORRES', 'Profesional junior', NULL, 'jorge.alarcon@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1022344726, 'VIVIANA DEL PILAR ALFONSO AVENDAÑO', 'Asesor administrativo', NULL, 'Viviana.alfonsoa@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1022347823, 'MIGUEL LEONARDO MARTINEZ SOTO', 'Lider de gestion humana', '3164724281', 'lidergh@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1022380991, 'DIEGO FERNANDO CASTILLO BAYONA', 'Profesional senior', NULL, 'diego.castillo@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1023961699, 'NICOLAS AVENDAÑO VASQUEZ', 'Profesional básico', '3166181606', 'nicolas.avendano@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1024478397, 'KAROL DANIELA SALCEDO ROMERO', 'Aprendiz etapa lectiva', NULL, 'karoldanielasr12@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1024486676, 'YOHANA ROCIO GOMEZ VARGAS', 'Contador junior', NULL, 'contadorjunior@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1026255124, 'MARIA ALEJANDRA MOJICA ARCINIEGAS', 'Profesional junior', NULL, 'maria.mojica@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1026267749, 'JUAN DAVID ARISTIZABAL MARULANDA', 'Profesional junior', NULL, 'juandavid.aristizabal@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1026292916, 'CAMILO ANDRES SANTANA OTALORA', 'Profesional básico', NULL, 'camilo.santana@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1026301759, 'JESSICA ASTRID MAYORGA BARRERA', 'Profesional de proyectos m3', NULL, 'jessicamayorgabarrera@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1031145571, 'DIANA MARCELA JACOBO MANCERA', 'Soporte hseq', NULL, 'soportehseq@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1031649053, 'EYMER SANTIAGO MÉNDEZ HERRERA', 'Aprendiz etapa lectiva', NULL, 'Santiagom202418@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1032414423, 'LAURA MARIA HERNANDEZ RIVEROS', 'Profesional senior', NULL, 'laura.hernandez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1032446831, 'ELIANA IVETH ALARCON RONDON', 'Profesional de proyectos m1', '3178534038', 'proyectos6@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1032467291, 'CHRISTIAN MAURICIO PARDO CARRANZA', 'Profesional senior', '3166969988', 'christian.pardo@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1033703338, 'CRISTIAN ANDRES MURILLO', 'Aprendiz etapa lectiva', NULL, 'andresmurillo163@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1033776515, 'DIEGO ANDREY LOPEZ CALDERON', 'Aprendiz etapa practica', NULL, 'andrey.1995@outlook.es', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1037580568, 'ANGELA MARIA TORO PATERNINA', 'Servicio soporte en abandono de pozos tipo ii', NULL, 'amtorop90@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1040746072, 'KELLY LORENA DIEZ HERNANDEZ', 'Profesional junior', NULL, 'kldiezhdz@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1042212691, 'YOJAN GIL GONZALEZ', 'Servicio especializado en costos de intervencion de pozos tipo i', '3173759350', 'yojan35@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1045706790, 'JOSE CARLOS GARCIA RUEDA', 'Profesional junior', '3114156922', 'jose.garcia@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1047451443, 'CARLOS RAFAEL OLMOS CARVAL', 'Profesional junior', '3012392187', 'carlos.olmos@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1053788938, 'GUSTAVO ADOLFO GIRALDO CORREA', 'Profesional de proyectos', '3102244072', 'ggiraldo@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1056709240, 'IVAN DARIO MOZO MORENO', 'Profesional senior', '3174236296', 'ivan.mozo@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1064838225, 'JORGE ENRIQUE NIÑO SANTOS', 'Servicio especializado en costos de intervencion de pozos tipo i', NULL, 'datolo90@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1065599609, 'CESAR ELIECER RODRIGUEZ CAMELO', 'Profesional junior', NULL, 'cesar.rodriguez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1070750164, 'DARWIN YAMID GARZON RODRIGUEZ', 'Aprendiz etapa practica', NULL, 'dgarzon162@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1072699593, 'RUBEN DARIO ORTIZ MURCIA', 'Profesional senior', '3144574949', 'ruben.ortiz@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1075212439, 'MARIANN LISSETTE MAHECHA LAVERDE', 'Profesional senior', NULL, 'mariann.mahecha@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1075213439, 'JESSICA PAOLA MOSQUERA LOZANO', 'Ingeniero(a) asistente de company man para operaciones de perforación completamiento y workover d1', NULL, 'JESHIKA.MOSQUERA@OUTLOOK.ES', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1075234956, 'INGRID YISET SANCHEZ PEREZ', 'Servicio especializado en costos de intervencion de pozos tipo i', NULL, 'ingridyisedsanchez@outlook.es', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1075239408, 'LENIN CORDOBA RIVAS', '35', NULL, 'lening06@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1075248439, 'MARIA DEL PILAR GOMEZ MORA', 'Ingeniero(a) asistente de company man para operaciones de perforación completamiento y workover d1', NULL, 'mdpgomezm@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1075263195, 'JESUS ERNESTO COQUECO VARGAS', 'Profesional senior', NULL, 'jesusccvargas@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1075284985, 'SEBASTIAN LLANOS GALLO', 'Profesional junior', '3203210974', 'sebastian.llanos@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1075286613, 'JULLY ALEXANDRA VARGAS QUINTERO', 'Profesional junior', '3223424156', 'jully.vargas@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1075292422, 'OLMER ANDRES MORALES MORA', 'Profesional junior', NULL, 'andres.morales@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1075293846, 'DANIELA MOLINA LANDINEZ', 'Profesional junior', NULL, 'daniela.molina@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1077173073, 'ESTEBAN GARCIA ROJAS', 'Supervisor integral en intervenciones a pozo tipo ii', NULL, 'estebangr1987@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1082981742, 'CHRISTIAN DAVID MENDOZA RAMIREZ', 'Profesional básico', NULL, 'christian.mendoza@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1087047704, 'YUBER RODRIGUEZ ARTURO', 'Profesional junior', NULL, 'yuber.rodriguez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1089599089, 'JUAN ESTEBAN LOPEZ OSORIO', 'Aprendiz etapa lectiva', NULL, 'Juan12@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1091668362, 'JESÚS IVÁN PACHECO ROMERO', 'Profesional junior', NULL, 'jesus.pacheco@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1095786398, 'AURA MARIA TRASLAVIÑA PRADA', 'Profesional junior', NULL, 'aura.traslavina@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1095826986, 'LIZETH DAYANA BAUTISTA RICO', 'Profesional junior', '3138678621', 'lizeth.bautista@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1095918218, 'WILMAR ANDRES DE LA HOZ GAMBOA', 'Profesional senior', NULL, 'wilmar.delahoz@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1096202008, 'JHONATAN ALEXANDER TORRES RODRIGUEZ', 'Servicio especializado en intervenciones a pozo tipo ii', NULL, 'jhonatantorresrdr@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1096208135, 'YESSICA VANESSA ALBA BELEÑO', 'Servicio especializado en costos de intervencion de pozos tipo i', '3159266614', 'yessica.alba19@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1096219044, 'LAURA MILENA ARCINIEGAS HERNANDEZ', '35', NULL, 'lauramilearciniegas25@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1096245598, 'MAIRA ALEJANDRA VASQUEZ CORREA', 'Servicio especializado en costos de intervencion de pozos tipo i', '3178787627', 'aleja.2017@outlook.es', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098639151, 'CARLOS ESPINOSA LEON', 'Profesional senior', '3007761534', 'carlos.espinosa@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098663190, 'YESSICA DEL CARMEN MATEUS TARAZONA', 'Profesional senior', '3228437251', 'yessica.tarazona@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098681142, 'LAURA MARCELA ARENAS PEREZ', 'Ingeniero de intervencion a pozos tipo iv', NULL, 'lamarcela1289@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098681773, 'JHON HARVEY CARREÑO HERNANDEZ', 'Profesional junior', '3114976619', 'jhon.carreno@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098683077, 'LUIS CARLOS MONSALVE PARRA', 'Profesional junior', '3187441574', 'luis.monsalve@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098692205, 'BRIGGITE SUSEC CAMACHO JEREZ', 'Profesional junior', '3186506670', 'briggite.camacho@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098697791, 'MARIA ALEJANDRA JOYA RINCON', 'Profesional senior', NULL, 'alejandra.joya@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098706838, 'JULIÁN ANDRÉS HERNÁNDEZ PINTO', 'Profesional junior', NULL, 'julian.hernandez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098725794, 'JOSE GABRIEL NASSAR DIAZ', 'Profesional junior', '3166233088', 'jose.nassar@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098726424, 'EMMANUEL ROBLES ALBARRACIN', 'Profesional junior', NULL, 'emmanuel.robles@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098727333, 'PERLA MELISSA PINZÓN AGUDELO', 'Ingeniero de intervencion a pozos tipo iii', NULL, 'perlameli_92@hotmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098733967, 'OSCAR FABIAN SUAREZ SUAREZ', 'Profesional senior', NULL, 'oscar.suarez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098739269, 'GUSTAVO ADOLFO MORENO BELTRAN', 'Profesional junior', '3144386777', 'gustavo.moreno@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098745210, 'ESTEFANY LIZETH VELANDIA JAIMES', 'Profesional junior', NULL, 'gestefanyvelandia@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098755426, 'JAIME JOSÉ MARTÍNEZ VERTEL', 'Profesional junior', '3102376098', 'jaime.martinez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098758681, 'MILTON JULIAN GUALTEROS QUIROGA', 'Profesional senior', '3002755299', 'milton.gualteros@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098761186, 'ALEXANDRA KATHERINE LONDOÑO CAMACHO', 'Profesional junior', NULL, 'alexandra.londoño@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098774228, 'ANGELICA MARIA GONZALEZ SANCHEZ', '26', '3014187370', 'ing.gonzalez.angelica@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098782789, 'JUAN SEBASTIAN AVILA PARRA', 'Profesional junior', '3105854019', 'juan.avila@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1098800508, 'CLAUDIA ALEJANDRA  CAJICÁ TRILLOS', 'Profesional básico', NULL, 'claudia.cajica@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1100950373, 'LADY MILENA LOPEZ ROJAS', 'Profesional junior', '3112450500', 'lady.lopez@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1100954344, 'CAMILA FERNANDA MEDINA SANDOVAL', 'Profesional junior', '3155257550', 'camila.medina@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1100961505, 'GEISSON RENÉ ZAFRA URREA', 'Profesional junior', '3163677407', 'geisson.zafra@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1101687575, 'MIGUEL ANGEL AYALA PINZON', 'Servicio especializado en integridad de pozos tipo ii', NULL, 'ing.ayala19@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1101692935, 'DIEGO FERNANDO PINTO HERNÁNDEZ', 'Profesional junior', '3143794371', 'diego.pinto@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1101693549, 'CESAR EDUARDO GARNICA GOMEZ', 'Profesional junior', NULL, 'cesar.garnica@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1101695749, 'JULIO CESAR RODRIGUEZ APARICIO', 'Servicio especializado en intervenciones a pozo tipo ii', '3143955091', 'cesarjuliocesar1997@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1102580512, 'FABRYZCIO ANDRES ORTIZ GARCIA', 'Aprendiz etapa lectiva', NULL, 'Fabryzcioortiz@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1115069820, 'GABRIEL EDUARDO VELEZ BARRERA', 'Profesional senior', '3007087857', 'gabriel.velez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1115914145, 'VIANI YORELY RUIZ GALINDO', 'Servicio especializado en costos de intervencion de pozos tipo ii', NULL, 'VIANIRUIZ@GMAIL.COM', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1115914517, 'CAMILO ANRES IBAÑEZ ROZO', 'Servicio especializado en costos de intervencion de pozos tipo i', NULL, 'ingcamilo.ibanez@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1119211830, 'LUIS MIGUEL GUEVARA MARLES', 'Coordinador hseq', '3102981548', 'hseq@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1121936876, 'LAURA DANIELA SEGURA MORERA', 'Soporte hseq proyectos', NULL, 'profesionalhseq@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1121941649, 'ALEJANDRO DUVAN LOPEZ ROJAS', 'Profesional junior', NULL, 'alejandro.lopez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1128452509, 'CINDY NATALIA ISAZA TORO', 'Profesional senior', NULL, 'cindy.isaza@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1136888916, 'DANIEL ANDRES JOYA SAAVEDRA', 'Profesional de proyectos m1', '3108612386', 'proyectos2@meridian.com.co', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1140847297, 'DAVID ALEJANDRO GARCIA CORONADO', 'Profesional senior', '3005751696', 'david.garcia@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1140916030, 'DIEGO ALEJANDRO BARRETO HERNANDEZ', 'Aprendiz etapa practica', '3213779236', 'dbarretohernandez13@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1143327261, 'GIOVANNI MARTINEZ LEONES', 'Profesional senior', NULL, 'giovanni.martinez@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1143388273, 'LAURA VANESSA CASTRO CARMONA', 'Servicio especializado en intervenciones a pozo tipo ii', NULL, 'laucastro212011@gmail.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1151954545, 'JUAN MATEO CORDOBA WAGNER', 'Profesional senior', NULL, 'juanmateo.cordoba@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL),
(1152210959, 'CARLOS JOSE URZOLA EBRATT', 'Profesional básico', '3182840175', 'carlos.urzola@meridianecp.com', 'MERIDIAN CONSULTING LTDA', '3138174050', '(1) 713 623 1113', NULL);

-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
