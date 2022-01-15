-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2022 at 11:04 AM
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
-- Database: `tcm_bookstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `PkProduct_Id` int(11) NOT NULL,
  `ProductName` varchar(200) NOT NULL,
  `ProductDescription` varchar(2000) NOT NULL,
  `ProductImage` varchar(500) NOT NULL,
  `ProductUpdate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ProductPrice` double NOT NULL,
  `FkType_Id` int(11) NOT NULL,
  `ProductDisplay` tinyint(1) NOT NULL COMMENT '0: hide / 1: show',
  `ProductPublisher` varchar(200) NOT NULL,
  `ProductPublishDate` date NOT NULL,
  `ProductDimensions` varchar(100) NOT NULL,
  `ProductPages` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`PkProduct_Id`, `ProductName`, `ProductDescription`, `ProductImage`, `ProductUpdate`, `ProductPrice`, `FkType_Id`, `ProductDisplay`, `ProductPublisher`, `ProductPublishDate`, `ProductDimensions`, `ProductPages`) VALUES
(1, 'Icebound: Shipwrecked at the Edge of the World', 'In the bestselling tradition of Hampton Sides\'s In the Kingdom of Ice, a \"gripping adventure tale\" (The Boston Globe) recounting Dutch polar explorer William Barents\' three harrowing Arctic expeditions--the last of which resulted in a relentlessly challenging year-long fight for survival.\r\nThe human story has always been one of perseverance--often against remarkable odds. The most astonishing survival tale of all might be that of 16th-century Dutch explorer William Barents and his crew of sixteen, who ventured farther north than any Europeans before and, on their third polar exploration, lost their ship off the frozen coast of Nova Zembla to unforgiving ice. The men would spend the next year fighting off ravenous polar bears, gnawing hunger, and endless winter.\r\nIn Icebound, Andrea Pitzer masterfully combines a gripping tale of survival with a sweeping history of the great Age of Exploration--a time of hope, adventure, and seemingly unlimited geographic frontiers. At the story\'s center is William Barents, one of the 16th century\'s greatest navigators whose larger-than-life ambitions and obsessive quest to chart a path through the deepest, most remote regions of the Arctic ended in both tragedy and glory. Journalist Pitzer did extensive research, learning how to use four-hundred-year-old navigation equipment, setting out on three Arctic expeditions to retrace Barents\'s steps, and visiting replicas of Barents\'s ship and cabin.\r\n\"A resonant meditation on human ingenuity, resilience, and hope\" (The New Yorker), Pitzer\'s reenactment of Barents\'s ill-fated journey shows us how the human body can function at twenty degrees below, the history of mutiny, the art of celestial navigation, and the intricacies of building shelters. But above all, it gives us a firsthand glimpse into the true nature of courage.', 'icebound-shipwrecked-at-the-edge-of-the-world_1642240767637.jpeg', '2022-01-15 09:59:27', 26.68, 1, 1, 'Scribner Book Company', '2021-01-12', '6.25 X 9.25 X 1.05 inches | 1.15 pounds', 320);

-- --------------------------------------------------------

--
-- Table structure for table `product_type`
--

CREATE TABLE `product_type` (
  `PkType_Id` int(11) NOT NULL,
  `TypeName` varchar(200) NOT NULL,
  `TypeOrder` int(11) NOT NULL,
  `TypeDisplay` tinyint(1) NOT NULL COMMENT '0: hide / 1: show'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_type`
--

INSERT INTO `product_type` (`PkType_Id`, `TypeName`, `TypeOrder`, `TypeDisplay`) VALUES
(1, 'History', 1, 1),
(2, 'Business', 2, 1),
(3, 'Travel', 3, 1),
(4, 'Technology', 4, 0),
(5, 'Manga', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `PkUser_Id` int(11) NOT NULL,
  `UserFullName` varchar(200) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `UserPassword` varchar(100) NOT NULL,
  `UserRole` tinyint(1) NOT NULL COMMENT '0: user / 1: admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`PkUser_Id`, `UserFullName`, `UserName`, `UserPassword`, `UserRole`) VALUES
(1, 'Tran Cao Minh', 'minhtc', '123', 0),
(2, 'Nguyen Van Long', 'longnv', '123', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`PkProduct_Id`),
  ADD KEY `FkType_Id` (`FkType_Id`);

--
-- Indexes for table `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`PkType_Id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`PkUser_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `PkProduct_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product_type`
--
ALTER TABLE `product_type`
  MODIFY `PkType_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `PkUser_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FkType_Id` FOREIGN KEY (`FkType_Id`) REFERENCES `product_type` (`PkType_Id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
