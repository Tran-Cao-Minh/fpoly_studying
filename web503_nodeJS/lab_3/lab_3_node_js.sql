-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2022 at 01:06 PM
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
-- Database: `lab_3_node_js`
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
  `ProductDisplay` tinyint(1) NOT NULL COMMENT '0: hide / 1: show'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`PkProduct_Id`, `ProductName`, `ProductDescription`, `ProductImage`, `ProductUpdate`, `ProductPrice`, `FkType_Id`, `ProductDisplay`) VALUES
(1, 'One Piece Pirate Recipes', 'Living the life of a pirate requires hearty meals! The master chef Sanji reveals the recipes that power the Straw Hat crew!\r\nYou can\'t become King of the Pirates on an empty stomach! Monkey D. Luffy has defeated dozens of rivals, and that kind of success takes a whole lot of energy! Fortunately, the pirate cook Sanji stands by Luffy\'s side, ready to support his captain with flaming kicks and piping-hot meals! Hearty and filling, Sanji\'s recipes keep the greatest pirate crew in the world well-fed, and his flashy techniques will take your culinary skills to the next level!', 'one-piece-pirate-recipes_1641985540344.webp', '2022-01-12 11:05:40', 18.38, 5, 1),
(2, 'Chainsaw Man, Vol. 1, 1', 'Broke young man + chainsaw dog demon = Chainsaw Man!\r\nDenji was a small-time devil hunter just trying to survive in a harsh world. After being killed on a job, he is revived by his pet devil-dog Pochita and becomes something new and dangerous--Chainsaw Man!\r\nDenji\'s a poor young man who\'ll do anything for money, even hunting down devils with his pet devil-dog Pochita. He\'s a simple man with simple dreams, drowning under a mountain of debt. But his sad life gets turned upside down one day when he\'s betrayed by someone he trusts. Now with the power of a devil inside him, Denji\'s become a whole new man--Chainsaw Man!', 'chainsaw-man-vol-1-1_1641986669890.jpeg', '2022-01-12 11:24:29', 9.19, 5, 1),
(3, 'Icebound: Shipwrecked at the Edge of the World', 'In the bestselling tradition of Hampton Sides\'s In the Kingdom of Ice, a \"gripping adventure tale\" (The Boston Globe) recounting Dutch polar explorer William Barents\' three harrowing Arctic expeditions--the last of which resulted in a relentlessly challenging year-long fight for survival.\r\nThe human story has always been one of perseverance--often against remarkable odds. The most astonishing survival tale of all might be that of 16th-century Dutch explorer William Barents and his crew of sixteen, who ventured farther north than any Europeans before and, on their third polar exploration, lost their ship off the frozen coast of Nova Zembla to unforgiving ice. The men would spend the next year fighting off ravenous polar bears, gnawing hunger, and endless winter.', 'icebound-shipwrecked-at-the-edge-of-the-world_1641986788331.jpeg', '2022-01-12 11:26:28', 26.67, 1, 1),
(4, 'Mudlark: In Search of London\'s Past Along the River Thames', 'Long heralded as a city treasure herself, expert \"mudlarker\" Lara Maiklem is uniquely trained in the art of seeking. Tirelessly trekking across miles of the Thames\' muddy shores, where others only see the detritus of city life, Maiklem unearths evidence of England\'s captivating, if sometimes murky, history--with some objects dating back to 43 AD, when London was but an outpost of the Roman Empire. From medieval mail worn by warriors on English battlefields to nineteenth-century glass marbles mass-produced for the nation\'s first soda bottles, Maiklem deduces the historical significance of these artifacts with the quirky enthusiasm and sharp-sightedness of a twenty-first century Sherlock Holmes.\r\n\r\nSeamlessly interweaving reflections from her own life with meditations on the art of wandering, Maiklem ultimately delivers--for Anglophiles and history lovers alike--a memorable treatise on the objects we leave in our wake, and the stories they can reveal if only we take a moment to look.', 'mudlark-in-search-of-londons-past-along-the-river-thames_1641986846693.jpeg', '2022-01-12 11:27:26', 25.71, 1, 1),
(5, 'Stress Test: Reflections on Financial Crises', 'As president of the Federal Reserve Bank of New York and then as President Barack Obama\'s secretary of the Treasury, Timothy F. Geithner helped the United States navigate the worst financial crisis since the Great Depression, from boom to bust to rescue to recovery. In a candid, riveting, and historically illuminating memoir, he takes readers behind the scenes of the crisis, explaining the hard choices and politically unpalatable decisions he made to repair a broken financial system and prevent the collapse of the Main Street economy. This is the inside story of how a small group of policy makers--in a thick fog of uncertainty, with unimaginably high stakes--helped avoid a second depression but lost the American people doing it. Stress Test is also a valuable guide to how governments can better manage financial crises, because this one won\'t be the last.', 'stress-test-reflections-on-financial-crises_1641986931411.jpeg', '2022-01-12 11:28:51', 18.4, 2, 1),
(6, 'Jack: Straight from the Gut', 'The most widely respected CEO in America looks back on his brilliant career at General Electric and reveals his personal business philosophy and unique managerial style.\r\nNearly 20 years ago, former General Electric CEO Reg Jones walked into Jack Welch\'s office and wrapped him in a bear hug. Congratulations, Mr. Chairman, said Reg. It was a defining moment for American business. So begins the story of a self-made man and a self-described rebel who thrived in one of the most volatile and economically robust eras in U.S. history, while managing to maintain a unique leadership style. In what is the most anticipated book on business management for our time, Jack Welch surveys the landscape of his career running one of the world\'s largest and most successful corporations.', 'jack-straight-from-the-gut_1641986982307.jpeg', '2022-01-12 11:29:42', 18.38, 2, 1),
(7, 'San Diego from A to Z: An Alphabetical Guide', 'Tired of the same old guidebooks? Learn where to go and what to do from a local! This alphabetical city guide looks at San Diego - and tourism - from a whole new angle, letting readers browse the city at their own pace. Learn about... * Local favorites * Tourist attractions * Cultural oddities * And enjoy unique trivia you just won\'t get from the other guys! Whether you\'re a first-time visitor or a life-long resident, San Diego from A to Z will surprise and delight you with plenty of facts, figures and personal experiences from author Laura Roberts. Explore alphabetically as you tour America\'s Finest City, starting at the Birch Aquarium and ending with Spanish phrases that begin with the letter Z. Learn more about San Diego landmarks, eateries, bars, museums, bookstores, neighborhoods, cultural oddities and much more. A must-have for the discerning traveler or seasoned flâneur. Find out what you\'ve been missing in San Diego and order your copy today.', 'san-diego-from-a-to-z-an-alphabetical-guide_1641987030207.webp', '2022-01-12 11:30:30', 15.95, 3, 1),
(8, 'Paris in Stride: An Insider\'s Walking Guide', 'Finally, the \"must-do, must-visit, must-see\" travel list given to you by the Parisian friend you\'ve been longing to have. Charmingly illustrated throughout, this practical guide will transport readers to the delightful sites and discoveries of Paris. Vibrant watercolors illustrate destinations including architectural marvels, gardens, historical highlights, cultural hubs, markets, food and wine favorites, and lots of little \"je ne sais quoi\'s\" that make Paris so magical. Cultural musings, accessible histories, anecdotes, and informative details accompany the illustrations throughout, making this volume truly as practical as it is beautiful.\r\nThe book features seven specially curated daylong walking tours. Winsome watercolor maps of the \"promenades\" with colorful icons of suggested sites guide readers through the romantic, winding Parisian streets, passing cafés, historical sights, small galleries, outdoor markets, and the kind of authentic and timeless places that one hopes to find when imagining the city. The careful artistry, insider\'s musings, and approachable readability--both visually and texturally--in this book will delight and inspire tourists and armchair travelers alike.', 'paris-in-stride-an-insiders-walking-guide_1641987084019.jpeg', '2022-01-12 11:31:24', 25.3, 3, 1);

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
  MODIFY `PkProduct_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
