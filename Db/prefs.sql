-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 30, 2023 at 06:07 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prefs`
--

-- --------------------------------------------------------

--
-- Table structure for table `appliances`
--

DROP TABLE IF EXISTS `appliances`;
CREATE TABLE IF NOT EXISTS `appliances` (
  `appliance_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `appliance_name` varchar(255) NOT NULL,
  `appliance_type` varchar(255) NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Offline',
  `wattage` int NOT NULL,
  PRIMARY KEY (`appliance_id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `appliances`
--

INSERT INTO `appliances` (`appliance_id`, `user_id`, `appliance_name`, `appliance_type`, `status`, `wattage`) VALUES
(2, 1, 'Microwave', 'Living Room', 'Offline', 25000),
(3, 1, 'Air Conditioner', 'Living Room', 'Online', 1500),
(5, 1, 'TV', 'Bedroom', 'Offline', 150),
(13, 1, 'test', 'test', 'Offline', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `appliance_daily_consumption`
--

DROP TABLE IF EXISTS `appliance_daily_consumption`;
CREATE TABLE IF NOT EXISTS `appliance_daily_consumption` (
  `appliance_id` int NOT NULL,
  `00:00` float DEFAULT '0',
  `01:00` float DEFAULT '0',
  `02:00` float DEFAULT '0',
  `03:00` float DEFAULT '0',
  `04:00` float DEFAULT '0',
  `05:00` float DEFAULT '0',
  `06:00` float DEFAULT '0',
  `07:00` float DEFAULT '0',
  `08:00` float DEFAULT '0',
  `09:00` float DEFAULT '0',
  `10:00` float DEFAULT '0',
  `11:00` float DEFAULT '0',
  `12:00` float DEFAULT '0',
  `13:00` float DEFAULT '0',
  `14:00` float DEFAULT '0',
  `15:00` float DEFAULT '0',
  `16:00` float DEFAULT '0',
  `17:00` float DEFAULT '0',
  `18:00` float DEFAULT '0',
  `19:00` float DEFAULT '0',
  `20:00` float DEFAULT '0',
  `21:00` float DEFAULT '0',
  `22:00` float DEFAULT '0',
  `23:00` float DEFAULT '0',
  KEY `fk_appliance_daily` (`appliance_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `appliance_daily_consumption`
--

INSERT INTO `appliance_daily_consumption` (`appliance_id`, `00:00`, `01:00`, `02:00`, `03:00`, `04:00`, `05:00`, `06:00`, `07:00`, `08:00`, `09:00`, `10:00`, `11:00`, `12:00`, `13:00`, `14:00`, `15:00`, `16:00`, `17:00`, `18:00`, `19:00`, `20:00`, `21:00`, `22:00`, `23:00`) VALUES
(10, 58, 13, 11, 14, 38, 28, 24, 35, 45, 57, 31, 45, 8, 27, 52, 56, 2, 25, 55, 22, 2, 6, 23, 37),
(5, 37, 36, 10, 1, 36, 55, 47, 11, 32, 5, 49, 49, 39, 49, 5, 57, 29, 36, 31, 47, 21, 22, 48, 52),
(3, 28, 14, 47, 13, 43, 56, 31, 46, 15, 56, 57, 57, 55, 40, 35, 54, 43, 56, 30, 39, 45, 47, 42, 9),
(2, 29, 12, 31, 2, 33, 42, 47, 51, 52, 48, 21, 21, 40, 18, 30, 36, 31, 43, 5, 13, 50, 29, 54, 2);

-- --------------------------------------------------------

--
-- Table structure for table `appliance_recommended_hours`
--

DROP TABLE IF EXISTS `appliance_recommended_hours`;
CREATE TABLE IF NOT EXISTS `appliance_recommended_hours` (
  `appliance_id` int NOT NULL,
  `00:00` float DEFAULT '0',
  `01:00` float DEFAULT '0',
  `02:00` float DEFAULT '0',
  `03:00` float DEFAULT '0',
  `04:00` float DEFAULT '0',
  `05:00` float DEFAULT '0',
  `06:00` float DEFAULT '0',
  `07:00` float DEFAULT '0',
  `08:00` float DEFAULT '0',
  `09:00` float DEFAULT '0',
  `10:00` float DEFAULT '0',
  `11:00` float DEFAULT '0',
  `12:00` float DEFAULT '0',
  `13:00` float DEFAULT '0',
  `14:00` float DEFAULT '0',
  `15:00` float DEFAULT '0',
  `16:00` float DEFAULT '0',
  `17:00` float DEFAULT '0',
  `18:00` float DEFAULT '0',
  `19:00` float DEFAULT '0',
  `20:00` float DEFAULT '0',
  `21:00` float DEFAULT '0',
  `22:00` float DEFAULT '0',
  `23:00` float DEFAULT '0',
  KEY `fk_appliance_recommended` (`appliance_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `appliance_recommended_hours`
--

INSERT INTO `appliance_recommended_hours` (`appliance_id`, `00:00`, `01:00`, `02:00`, `03:00`, `04:00`, `05:00`, `06:00`, `07:00`, `08:00`, `09:00`, `10:00`, `11:00`, `12:00`, `13:00`, `14:00`, `15:00`, `16:00`, `17:00`, `18:00`, `19:00`, `20:00`, `21:00`, `22:00`, `23:00`) VALUES
(2, 12, 14, 34, 8, 56, 16, 33, 56, 1, 16, 16, 33, 57, 4, 28, 10, 22, 23, 45, 38, 52, 25, 31, 20),
(3, 7, 35, 32, 57, 6, 37, 48, 10, 23, 24, 53, 13, 24, 19, 23, 59, 45, 48, 43, 9, 38, 41, 29, 24),
(5, 32, 29, 45, 20, 26, 7, 19, 13, 7, 55, 13, 19, 54, 35, 13, 19, 57, 45, 55, 21, 57, 41, 37, 58),
(10, 59, 60, 2, 11, 48, 28, 56, 16, 32, 49, 31, 7, 2, 48, 55, 9, 1, 36, 58, 60, 7, 33, 24, 19);

-- --------------------------------------------------------

--
-- Table structure for table `appliance_user_prefs`
--

DROP TABLE IF EXISTS `appliance_user_prefs`;
CREATE TABLE IF NOT EXISTS `appliance_user_prefs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `appliance_id` int NOT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `appliance_id` (`appliance_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `appliance_user_prefs`
--

INSERT INTO `appliance_user_prefs` (`id`, `appliance_id`, `start_time`, `end_time`) VALUES
(1, 2, '00:00:00', '05:00:00'),
(2, 13, '01:00:00', '04:30:00'),
(3, 5, '02:00:00', '05:15:00'),
(4, 3, '04:00:00', '07:45:00');

-- --------------------------------------------------------

--
-- Table structure for table `appliance_weekly_consumption`
--

DROP TABLE IF EXISTS `appliance_weekly_consumption`;
CREATE TABLE IF NOT EXISTS `appliance_weekly_consumption` (
  `appliance_id` int NOT NULL,
  `mon` decimal(10,2) DEFAULT '0.00',
  `tue` decimal(10,2) DEFAULT '0.00',
  `wed` decimal(10,2) DEFAULT '0.00',
  `thu` decimal(10,2) DEFAULT '0.00',
  `fri` decimal(10,2) DEFAULT '0.00',
  `sat` decimal(10,2) DEFAULT '0.00',
  `sun` decimal(10,2) DEFAULT '0.00',
  KEY `fk_appliance_weekly` (`appliance_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `appliance_weekly_consumption`
--

INSERT INTO `appliance_weekly_consumption` (`appliance_id`, `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`) VALUES
(2, '7.00', '17.00', '14.00', '21.00', '14.00', '7.00', '19.00'),
(3, '23.00', '10.00', '7.00', '5.00', '6.00', '16.00', '12.00'),
(5, '12.00', '24.00', '9.00', '0.00', '23.00', '15.00', '8.00'),
(10, '19.00', '23.00', '6.00', '12.00', '18.00', '3.00', '12.00');

-- --------------------------------------------------------

--
-- Table structure for table `daily_consumption`
--

DROP TABLE IF EXISTS `daily_consumption`;
CREATE TABLE IF NOT EXISTS `daily_consumption` (
  `user_id` int NOT NULL,
  `00:00` float DEFAULT '0',
  `01:00` float DEFAULT '0',
  `02:00` float DEFAULT '0',
  `03:00` float DEFAULT '0',
  `04:00` float DEFAULT '0',
  `05:00` float DEFAULT '0',
  `06:00` float DEFAULT '0',
  `07:00` float DEFAULT '0',
  `08:00` float DEFAULT '0',
  `09:00` float DEFAULT '0',
  `10:00` float DEFAULT '0',
  `11:00` float DEFAULT '0',
  `12:00` float DEFAULT '0',
  `13:00` float DEFAULT '0',
  `14:00` float DEFAULT '0',
  `15:00` float DEFAULT '0',
  `16:00` float DEFAULT '0',
  `17:00` float DEFAULT '0',
  `18:00` float DEFAULT '0',
  `19:00` float DEFAULT '0',
  `20:00` float DEFAULT '0',
  `21:00` float DEFAULT '0',
  `22:00` float DEFAULT '0',
  `23:00` float DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `daily_consumption`
--

INSERT INTO `daily_consumption` (`user_id`, `00:00`, `01:00`, `02:00`, `03:00`, `04:00`, `05:00`, `06:00`, `07:00`, `08:00`, `09:00`, `10:00`, `11:00`, `12:00`, `13:00`, `14:00`, `15:00`, `16:00`, `17:00`, `18:00`, `19:00`, `20:00`, `21:00`, `22:00`, `23:00`) VALUES
(1, 38, 100, 85, 33, 72, 84, 80, 76, 73, 93, 32, 53, 29, 8, 27, 97, 90, 92, 5, 45, 78, 2, 73, 84),
(2, 86, 89, 81, 51, 84, 79, 12, 17, 21, 53, 87, 69, 38, 41, 26, 67, 29, 37, 16, 93, 10, 78, 19, 7),
(3, 52, 95, 7, 45, 29, 76, 72, 66, 10, 94, 6, 74, 53, 98, 20, 70, 51, 65, 2, 57, 7, 29, 77, 98);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phonenumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `todays_consumption` int NOT NULL,
  `this_months_consumption` int NOT NULL,
  `country` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `firstname`, `lastname`, `email`, `phonenumber`, `password`, `todays_consumption`, `this_months_consumption`, `country`) VALUES
(1, 'reda', 'duieb', 'reda.duieb@gmail.com', '06666666', '$argon2i$v=19$m=65536,t=4,p=1$Q1ZDN3RtbzJON3dycGtEUA$zFsfFWmwJYY9XQTil57W2t8xS4t4j5iRP73BKrZ6YVQ', 8, 20, 'Italy'),
(2, 'test', 'test', 'test.test@test.test', '06666666666', '$argon2i$v=19$m=65536,t=4,p=1$OGdZeVVMZGN1WTFGWUJzNw$VGwKGDxG5Ee7SAf//Kdlr02g3J1QX2rB80xJmKi8Oz8', 0, 0, 'Italy'),
(3, 'test1', 'test1', 'test@test.test', 'testtest', '$argon2i$v=19$m=65536,t=4,p=1$VWQvVFQ1RjJxL3dLQUluOQ$AWGFMvRgtO6tQ2A4rNobeQZwrAc5O+v6x+1n3SeMGX8', 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `user_notifications`
--

DROP TABLE IF EXISTS `user_notifications`;
CREATE TABLE IF NOT EXISTS `user_notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `message` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_read` tinyint(1) DEFAULT '0',
  `alertType` varchar(10) NOT NULL DEFAULT 'dark',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_notifications`
--

INSERT INTO `user_notifications` (`id`, `user_id`, `message`, `created_at`, `is_read`, `alertType`) VALUES
(9, 1, 'info message', '2023-10-01 19:42:08', 0, 'info'),
(12, 1, 'success message', '2023-10-26 20:11:48', 0, 'success'),
(11, 1, 'warning message', '2023-10-26 20:11:48', 0, 'warning'),
(10, 1, 'danger message', '2023-10-26 20:11:48', 0, 'danger'),
(5, 1, 'primary message', '2023-10-26 20:13:40', 0, 'primary'),
(6, 1, 'secondary message', '2023-10-26 20:13:40', 0, 'secondary'),
(7, 1, 'light message', '2023-10-26 20:13:40', 0, 'light'),
(8, 1, 'dark message', '2023-10-26 20:13:40', 0, 'dark');

-- --------------------------------------------------------

--
-- Table structure for table `weekly_consumption`
--

DROP TABLE IF EXISTS `weekly_consumption`;
CREATE TABLE IF NOT EXISTS `weekly_consumption` (
  `user_id` int NOT NULL,
  `mon` decimal(10,2) DEFAULT NULL,
  `tue` decimal(10,2) DEFAULT NULL,
  `wed` decimal(10,2) DEFAULT NULL,
  `thu` decimal(10,2) DEFAULT NULL,
  `fri` decimal(10,2) DEFAULT NULL,
  `sat` decimal(10,2) DEFAULT NULL,
  `sun` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `weekly_consumption`
--

INSERT INTO `weekly_consumption` (`user_id`, `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`) VALUES
(1, '100.50', '200.75', '150.25', '300.00', '250.50', '175.25', '220.75');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
