-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2022 at 02:08 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lab_7_node_js`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `PkUser_Id` int(11) NOT NULL,
  `UserFullName` varchar(200) NOT NULL,
  `UserName` varchar(200) NOT NULL,
  `UserPassword` varchar(200) NOT NULL,
  `UserEmail` varchar(200) NOT NULL,
  `UserGender` tinyint(1) NOT NULL COMMENT '0: Female / 1: Male / 2: Other',
  `UserAddress` varchar(200) NOT NULL,
  `FkUserRole_Id` tinyint(2) NOT NULL,
  `UserStatus` tinyint(1) NOT NULL COMMENT '0: Locked / 1: Active',
  `UserImage` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`PkUser_Id`, `UserFullName`, `UserName`, `UserPassword`, `UserEmail`, `UserGender`, `UserAddress`, `FkUserRole_Id`, `UserStatus`, `UserImage`) VALUES
(8, 'Nguyen Van Long', 'longnv', '$2b$10$pDdSjQfzLe0cGMrCSVK9.OX5gr80BSkZRSrRhYtPpO/aPUkGXpIxG', 'longnvteacher@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 1, 1, 'nguyen-van-long_1644800111934.jpeg'),
(9, 'Tran Cao Minh', 'minhtc', '$2b$10$Ds3Ra7XUyorVD/rcZzzkY.eKmkFCA..wB34v.9Xdrm.1bB1egJ4aq', 'minhtcps18817@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 0, 1, 'tran-cao-minh_1645146485492.jpeg'),
(10, 'Dao Duc Minh Khoi', 'khoiddm', '$2b$10$o5nmFY50N0QJn64Wcgf9tuxPZBWohEx3m08XOU5y8JQkKdU0AuH2C', 'khoiddmps18818@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 0, 1, 'dao-duc-minh-khoi_1644799906626.jpeg'),
(11, 'Nguyen Dang Thanh', 'thanhnd', '$2b$10$ofd4acQNdLDluoooSmiEj.xfJEanpoxDhi4CshtDMZPTC04BQjnfG', 'thanhndps18819@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 0, 1, 'nguyen-dang-thanh_1644800012538.jpeg'),
(13, 'Le Vinh Ky', 'kylvf', '$2b$10$ZSSUIopuPMR5/E.KDRQVNeiwKabHkwGng.Ym0DgX.Wr9obpWAZCZq', 'kylvps18820@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 0, 1, 'le-vinh-ky_1644800335802.jpeg'),
(14, 'Nguyen Duy Quang', 'quangnd', '$2b$10$ZvUytCb/m.Y8KpqsbilLpuJvsN4NySvm6bzEbQ7JqfBGHRtQJYTbC', 'quangndps18816@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 0, 1, 'nguyen-duy-quang_1644800497965.jpeg'),
(15, 'Bui Huy Hoang', 'hoangbh', '$2b$10$QB98yDJU57u6eI.MhyPpau.JUiUzZjba.sgpdhm6.gNeWLrG0BzJ6', 'hoangbhps18815@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 0, 1, 'bui-huy-hoang_1644800592986.jpeg'),
(17, 'Tran Hong Son', 'sonht', '$2b$10$lc6BbUi2WVCPnfKud.EPcOo/xfi4PHMv7dchtMEKCDyE5DVLF2jDm', 'sonhtps18814@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 0, 1, 'tran-hong-son_1644999011987.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `PkUserRole_Id` tinyint(2) NOT NULL,
  `RoleName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`PkUserRole_Id`, `RoleName`) VALUES
(0, 'User'),
(1, 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`PkUser_Id`),
  ADD KEY `FkUserGender_Id` (`UserGender`),
  ADD KEY `FkUserRole_Id` (`FkUserRole_Id`),
  ADD KEY `FkUserStatus_Id` (`UserStatus`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`PkUserRole_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `PkUser_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `PkUserRole_Id` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FkUserRole_Id` FOREIGN KEY (`FkUserRole_Id`) REFERENCES `user_role` (`PkUserRole_Id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
