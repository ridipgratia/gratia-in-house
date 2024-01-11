-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2024 at 06:02 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gratia_hrms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `role`) VALUES
(1, 'admin@gratiatechnology.com', 'password', 1);

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `id` int(11) NOT NULL,
  `day` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `holidays`
--

INSERT INTO `holidays` (`id`, `day`, `date`, `name`, `createdAt`, `updatedAt`) VALUES
(2, 'Saturday', '2023-01-14', 'Magh Bihu', '2023-05-30 05:17:17', '2023-11-16 12:12:52'),
(3, 'Sunday', '2023-01-15', 'Tusu Pooja', '2023-05-30 05:17:43', '2023-05-30 05:17:43'),
(4, 'Monday', '2023-01-23', 'Netaji Subash Chandra Bose Jayanti', '2023-05-30 05:18:23', '2023-05-30 05:18:23'),
(5, 'Thursday', '2023-01-26', 'Republic Day', '2023-05-30 05:19:44', '2023-05-30 05:19:44'),
(6, 'Tuesday', '2023-01-31', 'Me-dam-me-phi', '2023-05-30 05:21:21', '2023-05-30 05:21:21'),
(7, 'Wednesday', '2023-03-08', 'Holi', '2023-05-30 05:21:56', '2023-05-30 05:21:56'),
(8, 'Friday', '2023-04-07', 'Good Friday', '2023-05-30 05:22:49', '2023-05-30 05:22:49'),
(9, 'Friday', '2023-04-15', 'Bohag Bihu', '2023-05-30 05:23:19', '2023-05-30 05:23:19'),
(10, 'Saturday', '2023-04-22', 'Eid-ul-Fitr', '2023-05-30 05:23:50', '2023-05-30 05:23:50'),
(11, 'Friday', '2023-05-05', 'Buddha Purnima', '2023-05-30 05:24:54', '2023-05-30 05:24:54'),
(12, 'Tuesday', '2023-08-15', 'Independance Day', '2023-05-30 05:26:11', '2023-05-30 05:26:11'),
(13, 'Monday', '2023-10-02', 'Gandhi Jayanti', '2023-05-30 05:26:44', '2023-05-30 05:26:44'),
(14, 'Saturday', '2023-10-21', 'Maha Saptami', '2023-05-30 05:27:33', '2023-05-30 05:27:33'),
(15, 'Sunday', '2023-10-22', 'Maha Ashtami', '2023-05-30 05:28:00', '2023-05-30 05:28:00'),
(16, 'Monday', '2023-10-23', 'Maha Navami', '2023-05-30 05:28:18', '2023-05-30 05:28:18'),
(17, 'Tuesday', '2023-10-24', 'Dussehra', '2023-05-30 05:30:18', '2023-05-30 05:30:18'),
(18, 'Sunday', '2023-11-12', 'Deepawali', '2023-05-30 05:31:24', '2023-09-04 06:31:50'),
(19, 'Monday', '2023-11-27', 'Guru Nanak Jayanti', '2023-05-30 05:32:00', '2023-05-30 05:32:00'),
(20, 'Monday', '2023-12-25', 'Christmas', '2023-05-30 05:32:29', '2023-05-30 05:32:29');

-- --------------------------------------------------------

--
-- Table structure for table `reset_tokens`
--

CREATE TABLE `reset_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` date NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reset_tokens`
--

INSERT INTO `reset_tokens` (`id`, `user_id`, `token`, `expires_at`, `createdAt`, `updatedAt`) VALUES
(50, 196, 'AW5Um9JPMV5M33fM', '2023-11-17', '2023-11-17', '2023-11-17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `emp_id` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT '''Active''',
  `role` int(11) NOT NULL DEFAULT 0,
  `user_image` varchar(255) DEFAULT NULL,
  `dob` varchar(255) NOT NULL,
  `date_of_joining` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `paid_leaves` double NOT NULL,
  `perment_address` varchar(500) NOT NULL,
  `current_address` text NOT NULL,
  `contact_no` int(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `emp_id`, `first_name`, `last_name`, `email`, `designation`, `password`, `status`, `role`, `user_image`, `dob`, `date_of_joining`, `gender`, `label`, `paid_leaves`, `perment_address`, `current_address`, `contact_no`, `created_at`, `updated_at`, `deleted_at`) VALUES
(192, 'GTPL2015100', 'BHABANI ', 'DAS', 'bhabanidasgratia@gmail.com', 'PROJECT MANAGER', '$2a$10$JbiOcEoXWzrTO7NpNYezFurKRExNchRuf/EaT5GdPknEZNAmoQBuS', 'Active', 0, NULL, '22-08-1991', '07-08-2023', 'female', 'HRMS', 12, '', '', 0, '2023-09-30 04:58:38', '2023-09-30 04:58:38', NULL),
(193, 'GTPL2015099', 'MIRDE ', 'PHAWA', 'mirdephawagratiahrastt@gmail.com', 'HR ASSISTANT', '$2a$10$OLcHMT7NQUEtwiP.f8UtO.jT.xNhhO2ESWzmXdCiOixyRPp3cXL4q', 'Active', 0, NULL, '08-11-1995', '01-08-2023', 'female', 'HRMS', 12, '', '', 0, '2023-09-30 05:31:22', '2023-09-30 05:31:22', NULL),
(195, 'GTPL2015086', 'Dipu Kumar', 'Mandal', 'dipu.gratia@gmail.com', 'SOFTWARE DEVELOPER', '$2a$10$M1bs82uCnBl0GSqUzPJKP.7vbaufHtJGIFY5pXQ1DzImnBOXiD7u2', 'Active', 0, NULL, '25-01-1993', '06-01-2023', 'Male', 'GTPL', 7, '', '', 0, '2023-09-30 06:29:03', '2023-09-30 06:29:03', NULL),
(196, 'GTPL2015096', 'RIDIP ', 'GOSWAMI', 'ridipgoswami596@gmail.com', 'WEB DEVELOPER', '$2a$10$SVFUSVcZicGxG4j0xbmg5e30WEQNb6yMHHys4rBXVhEkANRaJ4yvm', 'Active', 0, NULL, '01-07-1999', '10-07-2023', 'male', 'HRMS', 9, '', '', 0, '2023-09-30 06:45:08', '2023-09-30 06:45:08', NULL),
(197, 'GTPL2015011', 'FLORINA ', 'MAHANTA', 'florina.gratia@gmail.com', 'TAX CONSULTANT', '$2a$10$GutLpO0bd.QeZW1.RM3IEuf.lkEY0zw.9OBRE1VKMCr51SbrsfNcG', 'Active', 0, NULL, '07-08-1998', '03-01-2021', 'female', 'HRMS', 10, '', '', 0, '2023-10-04 07:45:50', '2023-10-04 07:45:50', NULL),
(198, '101426318746', 'MAWSUMI ', 'DEBNATH', 'mawsumi@gratiatechnology.com', 'FINENCE MANAGER', '$2a$10$qdw5/rLPI8DAhSNZ.m0wAeIXHaeY9DcvvdfnnaM78CM7AuFZNVwP2', 'Active', 0, NULL, '31-10-1989', '09-01-2017', 'female', 'GTPL', 4, '', '', 0, '2023-10-04 07:51:30', '2023-10-04 07:51:30', NULL),
(199, 'GTPL2015008', 'BABAN ', 'DAS', 'baban.gratia@gmail.com', 'GRAPHIC DESIGNER', '$2a$10$6VtUMDl9MtT4OB/vLmPlkugUmtckt.bGw4p.6h6YHHihzROS1fswC', 'Active', 0, NULL, '31-01-1994', '09-01-2020', 'male', 'GTPL', 4, '', '', 0, '2023-10-04 07:58:43', '2023-10-04 07:58:43', NULL),
(202, 'GTPL2015026', 'Mrinmoy', 'Barman', 'mrinmoy.gratia@gmail.com', 'Senior Software Developer', '$2a$10$vsA9EiCiPWE.gwK02n08Iualuonpo0z6w8DYPDcOkRJmD8yMMWfCy', 'Active', 0, NULL, '06-02-1996', '01-07-2022', 'male', 'GTPL', 12, '', '', 0, '2023-11-17 10:27:49', '2023-11-17 10:27:49', NULL),
(203, 'GTPL2015086', 'Dipu Kumar', 'Mandal', 'dipum@gmail.com', 'Developer', '$2a$10$i.6kT7ejbpNB7lOwtH169ePYz8e2GFNmfRJywddWWLUDuARxzFI5m', 'Active', 0, NULL, '25-01-1993', '06-01-2023', 'male', 'HRMS', 7, '', '', 0, '2023-11-18 09:23:14', '2023-11-18 09:23:14', NULL),
(204, 'GTPL2015018', 'Nisha Rani', 'Chamuah', 'nisharani.gratia@gmail.com', 'PROJECT ASSOCIATE', '$2a$10$yKyYSsr8eVpWQU.X81t0TO/LmYHNRXT84F4EJbamrenbedrBaOUhu', 'Active', 0, NULL, '06-12-1998', '11-06-2021', 'female', 'HRMS', 2, '', '', 0, '2023-11-18 09:39:17', '2023-11-18 09:39:17', NULL),
(205, 'GTPL2015099', 'Aroma', 'phawa', 'lavikim65@gmail.com', 'helpdesk', '$2a$10$YDVr8Q1J0nOe2MWK20APzuoS4ffs16aLNyRUUEHeHEJ1z5FY2Mk2a', 'Active', 0, NULL, '03-11-2002', '04-07-2023', 'female', 'HRMS', 9, '', '', 0, '2023-11-18 09:52:47', '2023-11-18 09:52:47', NULL),
(206, '0000111', 'XYZ', 'Dkhar', 'xyz@11111', 'manager', '$2a$10$rDc8nQW1n0KPrcWzc0no1.kSbmCuzoP93KyEK44Yi.aT2Vb/1Wnq.', 'Active', 0, NULL, '06-11-2002', '01-04-2023', 'male', 'HRMS', 12, '', '', 0, '2023-11-18 09:59:16', '2023-11-18 09:59:16', NULL),
(207, 'GTPL2015063', 'MANISH MUNNA ', 'pandit', 'manish.munna21@gmail.com', 'DATABASE ADMINISTRATOR', '$2a$10$beMa2BNZBUF1qskbBVgLNuuWQNasYx7lA.LR8WFuFEsapB570TdWa', 'Active', 0, NULL, '23-05-1996', '01-07-2022', 'male', 'HRMS', 12, '', '', 0, '2023-11-18 10:49:46', '2023-11-18 10:49:46', NULL),
(208, 'GTPL2015102', 'ARJINA ', 'SULTANA', 'sultana009@gmail.com', 'Project Assistant', '$2a$10$rLA7yfoh0wCgYkhk0HVaSuymKgxAtwlaT84pOFj1d30N.ZdWHjvhW', 'Active', 0, NULL, '20-08-2000', '06-11-2023', 'female', 'THS', 7, '', '', 0, '2023-11-18 12:27:15', '2023-11-18 12:27:15', NULL),
(209, 'GTPL2015026', 'NIJARA ', 'DAS', 'nijara.ds@gmail.com', 'PROJECT ASSOCIATE', '$2a$10$SqmzOOlCQ9QOcmUfXmGLRe58GBet4/Ia5bBxfRHQ4KZ10CHUnHZCC', 'Active', 0, NULL, '08-04-1987', '02-08-2021', 'female', 'THS', 11, '', '', 0, '2023-11-20 06:48:38', '2023-11-20 06:48:38', NULL),
(210, 'GTPL2015041', 'RANGJALI ', 'BORO', 'rangjali.gratia@gmail.com', 'PROJECT ASSISTANT', '$2a$10$puk1pnR0XGhG8k1CH1FSWeoIykY8NKbhOzOyylfItjRsHkJIhuWO.', 'Active', 0, NULL, '30-03-1994', '12-01-2021', 'female', 'THS', 1, '', '', 0, '2023-11-20 07:10:21', '2023-11-20 07:10:21', NULL),
(211, 'GTPL2015016', 'LIZA ', 'SARMAH', 'liza.borthakur136@gmail.com', 'PROJECT ASSOCIATE', '$2a$10$kzeZ93mSKlMgddV50BWhseAtRhms4NhBAYvvoMcWhgO8CEbb24sze', 'Active', 0, NULL, '01-10-1987', '06-06-2022', 'female', 'THS', 7, '', '', 0, '2023-11-20 07:38:52', '2023-11-20 07:38:52', NULL),
(212, 'GTPL2015045', 'SYED RASIDUL ', 'AHMED', 'rasidul1221@gmail.com', 'PROJECT ASSISTANT', '$2a$10$iKupVOudTxh22l0Ozotooew1s5SmhBFBTMfZqREuUfNQ3Gh1Xy4OW', 'Active', 0, NULL, '05-07-1986', '01-01-2022', 'male', 'THS', 12, '', '', 0, '2023-11-21 05:37:53', '2023-11-21 05:37:53', NULL),
(213, '', '', '', '', '', '$2a$10$4I3OKhCxGTkn8YGlHgYT1uwZJXFv.bcJhAw6cg0R3l2xM0o.hQqCy', 'Active', 0, NULL, 'Invalid Date', 'Invalid Date', '', '', 0, '', '', 0, '2024-01-04 07:54:11', '2024-01-04 07:54:11', NULL),
(214, 'dsdsdsd', 'ssa', 'sas', 'dsdsds@dd', 'dsdsd', '$2a$10$Qq5cbBJBXFpo.exulxI47OywKqSa1FL.kyqAzvB0Fqn1y2DA1htKu', 'Active', 0, NULL, 'Invalid Date', 'Invalid Date', '', '', 0, '', '', 0, '2024-01-04 09:26:17', '2024-01-04 09:26:17', NULL),
(215, 'sasasasasas', 'sasas', 'sasa', 'sas@dsds', 'ssasasasa', '$2a$10$OhRKQzcl0YT7IcOfji3OQOsl3r1Rz/0I8ndAhau5w000et6ycprWO', 'Active', 0, NULL, '1-5-2024', '1-1-1970', 'male', 'GTPL', 3333, 'ddsdsds', 'sasas', 43434343, '2024-01-04 10:49:57', '2024-01-04 10:49:57', NULL),
(216, 'sasasa', 'sasasa', 'sasa', 'sdas@dsdss', 'sasas', '$2a$10$yz54PT0ly9uoLbQDZq6hR.eudsTfeYW66VCRYXD12wvixd.Q8gfrq', 'Active', 0, NULL, '1-23-2024', '1-1-1970', 'male', 'GTPL', 323232, 'ddsdsds', 'sasas', 43434343, '2024-01-04 10:57:12', '2024-01-04 10:57:12', NULL),
(217, 'SASASA', 'aAaA', 'SSASSA', 'SAASA@DSDS', 'SASASA', '$2a$10$6LICEx.kUdgkQ3H8TmqCa.nivRNwFIrs5w9vxSOuxcaK7IP6jYfhe', 'Active', 0, NULL, '1-4-2024', '1-3-2024', 'male', 'GTPL', 2323, 'ddsdsds', 'sasas', 43434343, '2024-01-04 10:58:50', '2024-01-04 10:58:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_activities`
--

CREATE TABLE `users_activities` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `activity` varchar(500) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_activities`
--

INSERT INTO `users_activities` (`id`, `user_id`, `date`, `activity`, `created_at`, `updated_at`) VALUES
(67, 202, '2023-11-17', 'testing-1', '2023-11-25 11:30:39.649319', '2023-11-17 10:34:47.069343'),
(68, 202, '2023-11-17', 'testing2', '2023-11-25 11:30:39.649319', '2023-11-17 10:34:47.069343'),
(69, 192, '2023-11-17', 'Testing 1', '2023-11-25 11:30:39.649319', '2023-11-17 12:23:33.411305'),
(70, 192, '2023-11-17', 'Testing 2', '2023-11-25 11:30:39.649319', '2023-11-17 12:23:33.411305'),
(71, 196, '2023-11-18', 'testing 1', '2023-11-25 11:30:39.649319', '2023-11-18 12:20:08.696746'),
(72, 196, '2023-11-18', 'testing 2', '2023-11-25 11:30:39.649319', '2023-11-18 12:20:08.696746');

-- --------------------------------------------------------

--
-- Table structure for table `user_attendences`
--

CREATE TABLE `user_attendences` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `in_date` date NOT NULL,
  `in_time` varchar(255) NOT NULL,
  `in_distance` varchar(255) NOT NULL,
  `in_office` varchar(255) DEFAULT NULL,
  `out_date` varchar(30) NOT NULL DEFAULT '00-00-0000',
  `out_time` varchar(255) NOT NULL DEFAULT '',
  `out_distance` varchar(20) DEFAULT NULL,
  `out_office` varchar(255) DEFAULT NULL,
  `status` varchar(11) NOT NULL,
  `attendance_status` varchar(255) NOT NULL DEFAULT 'absent',
  `type` int(11) NOT NULL DEFAULT 0,
  `msg` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_attendences`
--

INSERT INTO `user_attendences` (`id`, `user_id`, `location`, `in_date`, `in_time`, `in_distance`, `in_office`, `out_date`, `out_time`, `out_distance`, `out_office`, `status`, `attendance_status`, `type`, `msg`, `created_at`, `updated_at`) VALUES
(51, 192, 'Guwahati', '2023-09-30', '10:46:18 AM', '14', 'PNRD', '2023-09-30', '10:49:57 AM', '13', 'PNRD', 'late', 'present', 0, 'Testing ', '2023-09-30 05:16:17', '2023-09-30 05:19:57'),
(52, 193, 'Guwahati', '2023-09-30', '11:27:09 AM', '12', 'PNRD', '00-00-0000', '', NULL, NULL, 'late', 'present', 0, 'Testing ', '2023-09-30 05:57:10', NULL),
(53, 192, 'Guwahati', '2023-10-03', '11:03:12 AM', '12', 'PNRD', '00-00-0000', '', NULL, NULL, 'late', 'present', 0, 'Due to medical emergency as I have fever went to hospital for check up', '2023-10-03 05:33:12', NULL),
(54, 196, 'Guwahati', '2023-10-10', '10:40:10 AM', '8', 'PNRD', '00-00-0000', '', NULL, NULL, 'late', 'present', 0, 'testing', '2023-10-10 05:10:07', NULL),
(55, 202, 'Guwahati', '2023-11-17', '4:00:04 PM', '14', 'PNRD', '2023-11-17', '4:04:47 PM', '14', 'PNRD', 'late', 'present', 0, 'testing ', '2023-11-17 10:30:04', '2023-11-17 10:34:47'),
(56, 192, 'Guwahati', '2023-11-17', '4:35:31 PM', '11', 'PNRD', '2023-11-17', '5:53:33 PM', '14', 'PNRD', 'late', 'present', 0, 'Due to traffic ', '2023-11-17 11:05:31', '2023-11-17 12:23:33'),
(57, 193, 'Guwahati', '2023-11-17', '5:58:13 PM', '11', 'PNRD', '00-00-0000', '', NULL, NULL, 'late', 'present', 0, 'Testing ', '2023-11-17 12:28:15', NULL),
(58, 204, 'Guwahati', '2023-11-18', '3:12:20 PM', '12', 'PNRD', '00-00-0000', '', NULL, NULL, 'late', 'present', 0, 'Testing', '2023-11-18 09:42:20', NULL),
(59, 192, 'Guwahati', '2023-11-18', '3:12:46 PM', '10', 'PNRD', '00-00-0000', '', NULL, NULL, 'late', 'present', 0, 'Testing', '2023-11-18 09:42:46', NULL),
(60, 196, 'Guwahati', '2023-11-18', '5:49:52 PM', '10', 'PNRD', '2023-11-18', '5:50:08 PM', '9', 'PNRD', 'late', 'present', 0, 'testing', '2023-11-18 12:19:53', '2023-11-18 12:20:08');

-- --------------------------------------------------------

--
-- Table structure for table `user_bank_details`
--

CREATE TABLE `user_bank_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `account_holder_name` varchar(255) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `ifsc` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_bank_details`
--

INSERT INTO `user_bank_details` (`id`, `user_id`, `bank_name`, `account_holder_name`, `branch_name`, `ifsc`, `account_number`, `created_at`, `updated_at`) VALUES
(191, 193, 'STATE BANK OF INDIA', 'MIRDE PHAWA', 'GUWAHATI', 'SBIN0011628', '33930583524', '2023-09-30 11:01:00', '2023-11-25 11:30:39'),
(192, 192, 'CANARA BANK', 'BHABANI DAS', 'GUWAHATI', 'CNRB0001861', '110063395764', '2023-09-30 10:28:00', '2023-11-25 11:30:39'),
(193, 195, 'Bank of India', 'Dipu Kumar Mandal', 'Dispur', '0000000', '00000000', '2023-09-30 11:59:00', '2023-11-25 11:30:39'),
(194, 196, 'YES BANK', 'RIDIPGOSWAMI', 'GUWAHATI', 'NESF0000005', '52200000017247', '2023-09-30 12:15:00', '2023-11-25 11:30:39'),
(195, 197, 'ICICI BANK ', 'FLORINA MAHANTA', 'GUWAHATI', 'ICIC0002456', '245601001942', '2023-10-04 13:15:00', '2023-11-25 11:30:39'),
(196, 198, 'ICICI BANK', 'MAWSUMI DEBNATH', 'GUWAHATI', 'ICIC0002456', '245601503091', '2023-10-04 13:21:00', '2023-11-25 11:30:39'),
(197, 199, 'ICICI BANK', 'BABAN DAS', 'GUWAHATI', 'ICIC0002456', '386301500840', '2023-10-04 13:28:00', '2023-11-25 11:30:39'),
(198, 202, 'UCO Bank ', 'Mrinmoy Barman', 'Bhetapara', 'UCBA0002472', '24720110015612', '2023-11-17 10:27:49', '2023-11-25 11:30:39'),
(199, 203, 'Bank of india', 'Dipu Kumar Mandal', 'Dispur', '000000', '0000000', '2023-11-18 09:23:14', '2023-11-25 11:30:39'),
(200, 204, 'ICICI BANK', 'NISHA RANI CHAMUAH', 'GANESHGURI BRANCH', 'ICIC0002456', '245601002057', '2023-11-18 09:39:17', '2023-11-25 11:30:39'),
(201, 205, 'SBI', '22233344556', 'Jowai ladthadlaboh ', 'SBI4530', '22233344556', '2023-11-18 09:52:47', '2023-11-25 11:30:39'),
(202, 206, 'UNION', '1111144445777', 'GUWAHATI', 'UNI1233', '1111144445777', '2023-11-18 09:59:16', '2023-11-25 11:30:39'),
(203, 207, 'Bank of Baroda', 'Manish muna pandit', 'Fatasil Aamsali', 'BARB0FATASI', '43510100004481', '2023-11-18 10:49:47', '2023-11-25 11:30:39'),
(204, 208, 'bank of india', 'ARJINA SULTANA', 'khanapara', 'BKI0005009', '500919010000059', '2023-11-18 12:27:15', '2023-11-25 11:30:39'),
(205, 209, 'ICICI', 'Nijana Das', 'Rukminigaon', 'ICIC0002456', '245601002079', '2023-11-20 06:48:38', '2023-11-25 11:30:39'),
(206, 210, 'ICIC', 'RANJALI', 'Rukminigaon', 'ICIC0001989', '198901507254', '2023-11-20 07:10:22', '2023-11-25 11:30:39'),
(207, 211, 'ICICI', 'LIZA Sarma', 'Rukminigaon', 'ICIC0002151', '215101001469', '2023-11-20 07:38:52', '2023-11-25 11:30:39'),
(208, 212, 'ICICI', 'RAASIDUL AHMED', 'Rukmini gaon', 'ICIC0002456', '245601503489', '2023-11-21 05:37:53', '2023-11-25 11:30:39');

-- --------------------------------------------------------

--
-- Table structure for table `user_documents`
--

CREATE TABLE `user_documents` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `document` varchar(255) NOT NULL,
  `document_name` varchar(255) NOT NULL,
  `document_destination` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_documents`
--

INSERT INTO `user_documents` (`id`, `user_id`, `document`, `document_name`, `document_destination`, `created_at`, `updated_at`) VALUES
(191, 194, '1696054142977-logo white (1).png', 'testing doc', './public/uploads', '2023-09-30 06:09:02', '2023-09-30 06:09:02'),
(192, 194, '1696054142987-Logo final talkshashila (1).png', 'test-2 doc', './public/uploads', '2023-09-30 06:09:02', '2023-09-30 06:09:02'),
(193, 195, '1696055456519-logo white (1).png', 'test-1 doc', './public/uploads', '2023-09-30 06:30:56', '2023-09-30 06:30:56'),
(194, 195, '1696055456524-Logo final talkshashila (1).png', 'test-2 doc', './public/uploads', '2023-09-30 06:30:56', '2023-09-30 06:30:56');

-- --------------------------------------------------------

--
-- Table structure for table `user_education_details`
--

CREATE TABLE `user_education_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `board_name` varchar(255) DEFAULT NULL,
  `degree_name` varchar(255) DEFAULT NULL,
  `school_name` varchar(255) DEFAULT NULL,
  `passing_year` varchar(255) DEFAULT NULL,
  `percentage` varchar(255) DEFAULT NULL,
  `marks` int(11) DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `created_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_education_details`
--

INSERT INTO `user_education_details` (`id`, `user_id`, `board_name`, `degree_name`, `school_name`, `passing_year`, `percentage`, `marks`, `updated_at`, `created_at`) VALUES
(28, 192, 'XX', 'XX', 'XX', 'XX', 'XX', 472, '2023-09-30', '2023-09-30'),
(29, 193, 'XX', 'XX', 'XX', 'XX', 'XX', 405, '2023-09-30', '2023-09-30'),
(30, 194, 'example ', 'example', 'example', '2023', '65%', 2233, '2023-09-30', '2023-09-30'),
(31, 195, 'testing', 'testing', 'testing', '2023', '65%', 2342, '2023-09-30', '2023-09-30'),
(32, 196, 'XX', 'XX', 'XX', 'XX', 'XX', 0, '2023-09-30', '2023-09-30'),
(33, 197, 'XX', 'XX', 'XX', 'XX', 'XX', 0, '2023-10-04', '2023-10-04'),
(34, 198, 'XX', 'XX', 'XX', 'XX', 'XX', 0, '2023-10-04', '2023-10-04'),
(35, 199, 'XX', 'XX', 'XX', 'XX', 'XX', 0, '2023-10-04', '2023-10-04'),
(36, NULL, 'SEBA', 'dsfgdfg', 'fdhgh', 'ghfgh', 'ghgfh', 678787, '2023-11-15', '2023-11-15');

-- --------------------------------------------------------

--
-- Table structure for table `user_leaves`
--

CREATE TABLE `user_leaves` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `leave_type` varchar(100) NOT NULL,
  `is_half_day` tinyint(1) NOT NULL,
  `applied_on` varchar(255) NOT NULL,
  `start_date` varchar(255) NOT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `duration` double NOT NULL,
  `reason` varchar(255) NOT NULL,
  `cancel_reason` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `document` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_leaves`
--

INSERT INTO `user_leaves` (`id`, `user_id`, `leave_type`, `is_half_day`, `applied_on`, `start_date`, `end_date`, `duration`, `reason`, `cancel_reason`, `status`, `document`) VALUES
(3487, 202, 'Casual', 0, '2023-11-17 10:30:50', '2023-11-18', '2023-11-18', 1, 'Marriege ceremony of one of my cousins', 'testing', 'cancelled', 'N/A'),
(3488, 192, 'Medical', 0, '2023-11-18 09:48:23', '2023-11-20', '2023-11-20', 1, 'Medical', NULL, 'Approved', 'N/A'),
(3489, 196, 'Casual', 0, '2023-11-18 10:19:37', '2023-11-18', '2023-11-18', 1, 'hewgkdsgoiugewrhslgkjhwsgdsbglergkjhwdsvjma', NULL, 'Approved', 'N/A');

-- --------------------------------------------------------

--
-- Table structure for table `user_personal_details`
--

CREATE TABLE `user_personal_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `marital_status` varchar(255) DEFAULT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `phone_no` varchar(255) NOT NULL,
  `emergency_contact_no` varchar(255) NOT NULL,
  `uan_no` varchar(255) DEFAULT NULL,
  `esic` varchar(255) DEFAULT NULL,
  `pan_no` varchar(255) DEFAULT NULL,
  `aadhar_no` varchar(255) DEFAULT NULL,
  `present_address` varchar(255) DEFAULT NULL,
  `permanent_address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_personal_details`
--

INSERT INTO `user_personal_details` (`id`, `user_id`, `marital_status`, `father_name`, `mother_name`, `phone_no`, `emergency_contact_no`, `uan_no`, `esic`, `pan_no`, `aadhar_no`, `present_address`, `permanent_address`, `created_at`, `updated_at`) VALUES
(191, 193, 'Unmarried', 'KHIENLANG RYNGKHLEM', 'MONLANG PHAWA', '9612036845', '9612036871', 'N/A', 'N/A', 'GMJPP1273D', '381773502690', 'Anand Nagar,Six Mile H.No.-49, Kamrup Metro Assam-781022', 'Wapung Kur,East Jaintia,Meghalaya -793160', '2023-09-30 00:00:00', '2023-11-25 11:30:39'),
(192, 192, 'Unmarried', 'DHIREN DAS', 'KALPANA DAS', '9101536929', '8876202645', 'N/A', 'N/A', 'CHWPD5466J', '309696956721', 'Dr.Zakir Hussain Road,Byelane-9,Rupkonwar Chachal Path,House No-29,Kamrup Metro,Assam,Pin-781036', 'Baihata Chariali,Panara,Boli Chowk,Kamrup Rural,Assam', '2023-09-30 00:00:00', '2023-11-25 11:30:39'),
(193, 195, 'Unmarried', 'Laxmeshwar Mandal', 'Nirmala Devi Mandal', '7644949363', '7644949363', '000000', '00000', '000000', '00000', 'Lachit Nagar, Guwahati', 'Dhanusha janakpur, Nepal', '2023-09-30 00:00:00', '2023-11-25 11:30:39'),
(194, 196, 'Unmarried', 'GOKUL GOSWAMI', 'ANITA GOSWAMI', '7002142698', '7002142698', 'N/A', 'N/A', 'CTSPG2939M', '954218160274', 'Sualkuchi,Shrihati ,Kamrup ,Assam -781103', 'Sualkuchi,Shrihati ,Kamrup ,Assam -781103', '2023-09-30 00:00:00', '2023-11-25 11:30:39'),
(195, 197, 'Unmarried', 'LT. HARGOBINDA MAHANTA', 'BHABANI MAHANTA ', '9577371239', '7099670892', '101712152586', '4301908584', 'DFKPM3740F', '5196 4143 8527', 'House no-13, Piyali Phukan Path, near Sankardev Namghar,  Guwahati- 21', 'House no-13, Piyali Phukan Path, near Sankardev Namghar,  Guwahati- 21', '2023-10-04 00:00:00', '2023-11-25 11:30:39'),
(196, 198, 'Married', 'INDRA MOHAN DEBNATH', 'SHOVA DEBNATH', '8724913228', '7002047829', '101426318746', '', 'CCIPD1900Q', '287300887558', 'H.No-17, By Lane-1, Sree Nagar, Dispur, Guwahati, Assam-', 'Adagudam, Sri Bhumi Nagar:2, H.No-08, P.O: Odalbakra, City: Guwahati, Kamrup, Assam', '2023-10-04 00:00:00', '2023-11-25 11:30:39'),
(197, 199, 'Unmarried', 'LT. MATINDRA DAS', 'AMBIKA DAS', '8011654859', '8011654859', 'XX', '', 'BRHPD5513Q', 'XX', 'Latakata, Ganeshpara, Beltola, Kamrup, Assam-781028', 'Vill+P.O.- Garamdew, P.S-Mushalpur, Baksa, ASSAM-781377', '2023-10-04 00:00:00', '2023-11-25 11:30:39'),
(199, 202, 'Unmarried', 'Late Hitesh Barman', 'Binita Barman', '8638746692', '7896673308', '101854967746', 'n/a', 'CCUPB6532N', '798432909303', 'Guwahati', 'Haribhanga', '2023-11-17 10:27:49', '2023-11-25 11:30:39'),
(200, 203, 'Unmarried', 'Laxmeshwar Mandal', 'Nirmala Devi Mandal', '7644949363', '7644949363', '00000', '00000', '00000', '0000000', 'Lachit Nagar, Ullubari', 'Janakpur, Dhanusha, Nepal', '2023-11-18 09:23:14', '2023-11-25 11:30:39'),
(201, 204, 'Unmarried', 'PINTU CHAMUAH', 'NAYAN MONI CHAMUAH', '9706377483', '8876052048', '101712152141', '4301908587', 'BJSPC1782R', '615522299260', 'borkhat', 'sonapur', '2023-11-18 09:39:17', '2023-11-25 11:30:39'),
(202, 205, 'Unmarried', 'Khienlang Ryngkhlem', 'Monlang Phawa', '9612036845', '9612036845', '32222222223', '777777776', 'GMJPP1273D', '381773502690', 'JOWIA, jaintia hills meghalaya', 'jowai jaintia hills meghalaya', '2023-11-18 09:52:47', '2023-11-25 11:30:39'),
(203, 206, 'Married', 'qqqy', 'MONLANG PHAWA', '9645321811', '8767654321', '15113153242', 'HJGSGHFSS', 'JHFR124D', '1441313314552', 'Assam guwahati', 'assam , guwahati', '2023-11-18 09:59:16', '2023-11-25 11:30:39'),
(204, 207, 'Unmarried', 'ARVIND PANDIT', 'PREMSHILA PANDIT', '8876736533', '9707011497', '101336809043', 'N/A', 'CQUPP3237Q', '310382302484', 'H.No-01, Sewali Path, Near tular Factory, Fatashil Ambari, , Kmrup (M), Assam-781025', 'Gram-Dumari, Mirpur Patanrch, Vaishali, Dumari, Bihar-844116', '2023-11-18 10:49:47', '2023-11-25 11:30:39'),
(205, 208, 'Unmarried', 'ASAN ALI', 'N/A', '9577771578', '9365548147', 'N/A', 'N/A', 'KPZPS2126M', '416816820296', 'SATGAON, NOWAPARA,P.O- PANJABARI ASSAM-781037', 'SATGAON, NOWAPARA,P.O- PANJABARI ASSAM-781037', '2023-11-18 12:27:15', '2023-11-25 11:30:39'),
(206, 209, 'Unmarried', 'LT. ADYA DAS', 'RENU DAS', '7099418722', '9854421919', '101724437767', '4301919760', 'AWTPD2143A', '622806903226', '\"Ananda Nagar, Six Mile\nPost: Khanapara, Dist: Kamrup(M)\nPin-781022, Guwahati\nAssam\"', '\"Ananda Nagar, Six Mile\nPost: Khanapara, Dist: Kamrup(M)\nPin-781022, Guwahati\nAssam\"', '2023-11-20 06:48:38', '2023-11-25 11:30:39'),
(207, 210, 'Unmarried', 'DEBEN BORO', 'N/G', '6003635209', 'N/G', 'N/A', 'N/A', 'CKTPB6309Q', 'N/G', 'Kundil Nagar, House No.-02,Sarumotoria,Downtown,Kamrup (M), Assam-781001', 'Lampara, P. S.- Boko, P.O-Birpara,Kamrup, Assam-781123', '2023-11-20 07:10:22', '2023-11-25 11:30:39'),
(208, 211, 'Married', 'ABANI SARMAH', 'PRANITA DEVI', '786077499', '9854042631', '101712152160', 'N/A', 'CJTPS6062C', '7221 4046 6188', 'House No.-07 , Jaya Path,Bye lane no 4,Narikal Basti, Zoo road, Kamrup (M), Guwahati-24', 'House No.-07 , Jaya Path,Bye lane no 4,Narikal Basti, Zoo road, Kamrup (M), Guwahati-24', '2023-11-20 07:38:52', '2023-11-25 11:30:39'),
(209, 212, 'Unmarried', 'SYED MAZAMIL HUSSAIN', 'LT. GOLBAHAR BEGUM', '8486856847', '7638878402', 'N/A', 'N/A', 'AKYPA6138P', '2407 4201 3250', 'Hemgiri Path,South Sarania,Ulubari', 'Vill-Kacharua, P.O-Puthimari, Kendukona, Kamrup,Assam-781380', '2023-11-21 05:37:53', '2023-11-25 11:30:39');

-- --------------------------------------------------------

--
-- Table structure for table `user_salaries`
--

CREATE TABLE `user_salaries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `label` varchar(255) NOT NULL,
  `month` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `present_days` int(11) DEFAULT NULL,
  `working_days` int(11) DEFAULT NULL,
  `leaves` double DEFAULT NULL,
  `adjust_leaves` double DEFAULT NULL,
  `adjust_late` int(11) DEFAULT NULL,
  `late` int(11) NOT NULL,
  `ctc_per_month` int(11) DEFAULT NULL,
  `basic` int(11) NOT NULL,
  `epf` int(11) DEFAULT NULL,
  `esic` int(11) DEFAULT NULL,
  `professional_tax` int(11) DEFAULT NULL,
  `late_days_deduction` int(11) DEFAULT NULL,
  `leave_days_deduction` int(11) DEFAULT NULL,
  `total_deductions` int(11) DEFAULT NULL,
  `net_salary` int(11) DEFAULT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_salaries`
--

INSERT INTO `user_salaries` (`id`, `user_id`, `label`, `month`, `year`, `present_days`, `working_days`, `leaves`, `adjust_leaves`, `adjust_late`, `late`, `ctc_per_month`, `basic`, `epf`, `esic`, `professional_tax`, `late_days_deduction`, `leave_days_deduction`, `total_deductions`, `net_salary`, `created_at`, `updated_at`) VALUES
(108, 192, 'HRMS', '01', '2023', 0, 31, 0, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2023-11-01', '2023-11-01'),
(109, 193, 'HRMS', '01', '2023', 0, 31, 0, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2023-11-01', '2023-11-01'),
(110, 196, 'HRMS', '01', '2023', 0, 31, 0, NULL, NULL, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, '2023-11-01', '2023-11-01'),
(111, 197, 'HRMS', '01', '2023', 0, 31, 0, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2023-11-01', '2023-11-01');

-- --------------------------------------------------------

--
-- Table structure for table `user_salary_structures`
--

CREATE TABLE `user_salary_structures` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `basic` int(11) DEFAULT NULL,
  `hra` int(11) NOT NULL,
  `conveyance` int(11) NOT NULL,
  `special_allowance` int(11) NOT NULL,
  `gross_monthly_amount` int(11) NOT NULL,
  `bonus` int(11) NOT NULL,
  `performance_allowance` int(11) NOT NULL,
  `epf` int(11) NOT NULL,
  `esic` int(11) NOT NULL,
  `professional_tax` int(11) DEFAULT NULL,
  `ctc_per_month` int(11) NOT NULL,
  `ctc_per_annum` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_salary_structures`
--

INSERT INTO `user_salary_structures` (`id`, `user_id`, `basic`, `hra`, `conveyance`, `special_allowance`, `gross_monthly_amount`, `bonus`, `performance_allowance`, `epf`, `esic`, `professional_tax`, `ctc_per_month`, `ctc_per_annum`, `created_at`, `updated_at`) VALUES
(190, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2023-09-30 05:08:06', '2023-09-30 05:08:06'),
(191, 193, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, '2023-09-30 05:32:14', '2023-09-30 05:32:14'),
(192, 194, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, '2023-09-30 06:07:30', '2023-09-30 06:07:30'),
(193, 195, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2023-09-30 06:30:20', '2023-09-30 06:30:20'),
(194, 196, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, '2023-09-30 06:45:59', '2023-09-30 06:45:59'),
(195, 197, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2023-10-04 07:46:34', '2023-10-04 07:46:34'),
(196, 198, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2023-10-04 07:52:06', '2023-10-04 07:52:06'),
(197, 199, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2023-10-04 07:59:18', '2023-10-04 07:59:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reset_tokens`
--
ALTER TABLE `reset_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_activities`
--
ALTER TABLE `users_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_attendences`
--
ALTER TABLE `user_attendences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_bank_details`
--
ALTER TABLE `user_bank_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_documents`
--
ALTER TABLE `user_documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_education_details`
--
ALTER TABLE `user_education_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_leaves`
--
ALTER TABLE `user_leaves`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_personal_details`
--
ALTER TABLE `user_personal_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_salaries`
--
ALTER TABLE `user_salaries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_salary_structures`
--
ALTER TABLE `user_salary_structures`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `reset_tokens`
--
ALTER TABLE `reset_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=226;

--
-- AUTO_INCREMENT for table `users_activities`
--
ALTER TABLE `users_activities`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `user_attendences`
--
ALTER TABLE `user_attendences`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `user_bank_details`
--
ALTER TABLE `user_bank_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

--
-- AUTO_INCREMENT for table `user_documents`
--
ALTER TABLE `user_documents`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT for table `user_education_details`
--
ALTER TABLE `user_education_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `user_leaves`
--
ALTER TABLE `user_leaves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3490;

--
-- AUTO_INCREMENT for table `user_personal_details`
--
ALTER TABLE `user_personal_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;

--
-- AUTO_INCREMENT for table `user_salaries`
--
ALTER TABLE `user_salaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `user_salary_structures`
--
ALTER TABLE `user_salary_structures`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=198;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
