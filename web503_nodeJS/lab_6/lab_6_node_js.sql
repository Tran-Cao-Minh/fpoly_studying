-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2022 at 04:16 AM
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
-- Database: `lab_6_node_js`
--

-- --------------------------------------------------------

--
-- Table structure for table `display_status`
--

CREATE TABLE `display_status` (
  `PkDisplayStatus_Id` tinyint(1) NOT NULL,
  `statusName` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `display_status`
--

INSERT INTO `display_status` (`PkDisplayStatus_Id`, `statusName`) VALUES
(0, 'Hide'),
(1, 'Show');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `PkProduct_Id` int(11) NOT NULL,
  `ProductName` varchar(200) NOT NULL,
  `ProductDescription` varchar(2000) NOT NULL,
  `ProductImage` varchar(500) NOT NULL,
  `ProductUpdate` timestamp NOT NULL DEFAULT current_timestamp(),
  `ProductPrice` double NOT NULL,
  `FkProductCategory_Id` int(11) NOT NULL,
  `FkDisplayStatus_Id` tinyint(1) NOT NULL,
  `ProductPublisher` varchar(200) NOT NULL,
  `ProductPublishDate` date NOT NULL,
  `ProductDimensions` varchar(100) NOT NULL,
  `ProductPages` int(5) NOT NULL,
  `ProductViews` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`PkProduct_Id`, `ProductName`, `ProductDescription`, `ProductImage`, `ProductUpdate`, `ProductPrice`, `FkProductCategory_Id`, `FkDisplayStatus_Id`, `ProductPublisher`, `ProductPublishDate`, `ProductDimensions`, `ProductPages`, `ProductViews`) VALUES
(1, 'Icebound: Shipwrecked at the Edge of the World', 'In the bestselling tradition of Hampton Sides\'s In the Kingdom of Ice, a \"gripping adventure tale\" (The Boston Globe) recounting Dutch polar explorer William Barents\' three harrowing Arctic expeditions--the last of which resulted in a relentlessly challenging year-long fight for survival.\r\nThe human story has always been one of perseverance--often against remarkable odds. The most astonishing survival tale of all might be that of 16th-century Dutch explorer William Barents and his crew of sixteen, who ventured farther north than any Europeans before and, on their third polar exploration, lost their ship off the frozen coast of Nova Zembla to unforgiving ice. The men would spend the next year fighting off ravenous polar bears, gnawing hunger, and endless winter.\r\nIn Icebound, Andrea Pitzer masterfully combines a gripping tale of survival with a sweeping history of the great Age of Exploration--a time of hope, adventure, and seemingly unlimited geographic frontiers. At the story\'s center is William Barents, one of the 16th century\'s greatest navigators whose larger-than-life ambitions and obsessive quest to chart a path through the deepest, most remote regions of the Arctic ended in both tragedy and glory. Journalist Pitzer did extensive research, learning how to use four-hundred-year-old navigation equipment, setting out on three Arctic expeditions to retrace Barents\'s steps, and visiting replicas of Barents\'s ship and cabin.\r\n\"A resonant meditation on human ingenuity, resilience, and hope\" (The New Yorker), Pitzer\'s reenactment of Barents\'s ill-fated journey shows us how the human body can function at twenty degrees below, the history of mutiny, the art of celestial navigation, and the intricacies of building shelters. But above all, it gives us a firsthand glimpse into the true nature of courage.', 'icebound-shipwrecked-at-the-edge-of-the-world_1642240767637.jpeg', '2022-01-15 17:00:00', 26.68, 1, 1, 'Scribner Book Company', '2021-01-12', '6.25 X 9.25 X 1.05 inches | 1.15 pounds', 320, 35),
(2, 'Circe', 'A bold and subversive retelling of the goddess\'s story, this #1 New York Times bestseller is both epic and intimate in its scope, recasting the most infamous female figure from the Odyssey as a hero in her own right (Alexandra Alter, The New York Times).\r\nIn the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child -- not powerful, like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power -- the power of witchcraft, which can transform rivals into monsters and menace the gods themselves.\r\nThreatened, Zeus banishes her to a deserted island, where she hones her occult craft, tames wild beasts and crosses paths with many of the most famous figures in all of mythology, including the Minotaur, Daedalus and his doomed son Icarus, the murderous Medea, and, of course, wily Odysseus.\r\nBut there is danger, too, for a woman who stands alone, and Circe unwittingly draws the wrath of both men and gods, ultimately finding herself pitted against one of the most terrifying and vengeful of the Olympians. To protect what she loves most, Circe must summon all her strength and choose, once and for all, whether she belongs with the gods she is born from, or the mortals she has come to love.\r\nWith unforgettably vivid characters, mesmerizing language, and page-turning suspense, Circe is a triumph of storytelling, an intoxicating epic of family rivalry, palace intrigue, love and loss, as well as a celebration of indomitable female strength in a man\'s world.', 'circe_1642254165871.webp', '2022-01-16 17:00:00', 15.63, 1, 1, 'Back Bay Books', '2020-04-14', '5.4 X 8.1 X 1.1 inches | 0.8 pounds', 416, 6),
(3, 'Cloud Cuckoo Land', '\"If you\'re looking for a superb novel, look no further.\" --The Washington Post\r\nThe instant New York Times bestseller and finalist for the 2021 National Book Award is \"wildly inventive, a humane and uplifting book for adults that\'s infused with the magic of childhood reading experiences\" (The New York Times Book Review).\r\nFrom the Pulitzer Prize-winning author of All the Light We Cannot See, perhaps the most bestselling and beloved literary fiction of our time, comes Cloud Cuckoo Land.\r\nSet in Constantinople in the fifteenth century, in a small town in present-day Idaho, and on an interstellar ship decades from now, Anthony Doerr\'s gorgeous third novel is a triumph of imagination and compassion, a soaring story about children on the cusp of adulthood in worlds in peril, who find resilience, hope--and a book. In Cloud Cuckoo Land, Doerr has created a magnificent tapestry of times and places that reflects our vast interconnectedness--with other species, with each other, with those who lived before us, and with those who will be here after we\'re gone.\r\nThirteen-year-old Anna, an orphan, lives inside the formidable walls of Constantinople in a house of women who make their living embroidering the robes of priests. Restless, insatiably curious, Anna learns to read, and in this ancient city, famous for its libraries, she finds a book, the story of Aethon, who longs to be turned into a bird so that he can fly to a utopian paradise in the sky. This she reads to her ailing sister as the walls of the only place she has known are bombarded in the great siege of Constantinople. Outside the walls is Omeir, a village boy, miles from home, conscripted with his beloved oxen into the invading army. His path and Anna\'s will cross.', 'cloud-cuckoo-land_1642262710799.webp', '2022-01-15 17:00:00', 27.6, 1, 1, 'Scribner Book Company', '2021-09-28', '6.4 X 9.1 X 1.8 inches | 2.0 pounds', 640, 19),
(4, 'The Lincoln Highway', 'The bestselling author of A Gentleman in Moscow and Rules of Civility and master of absorbing, sophisticated fiction returns with a stylish and propulsive novel set in 1950s America\r\nIn June, 1954, eighteen-year-old Emmett Watson is driven home to Nebraska by the warden of the juvenile work farm where he has just served fifteen months for involuntary manslaughter. His mother long gone, his father recently deceased, and the family farm foreclosed upon by the bank, Emmett\'s intention is to pick up his eight-year-old brother, Billy, and head to California where they can start their lives anew. But when the warden drives away, Emmett discovers that two friends from the work farm have hidden themselves in the trunk of the warden\'s car. Together, they have hatched an altogether different plan for Emmett\'s future, one that will take them all on a fateful journey in the opposite direction--to the City of New York.\r\nSpanning just ten days and told from multiple points of view, Towles\'s third novel will satisfy fans of his multi-layered literary styling while providing them an array of new and richly imagined settings, characters, and themes.', 'the-lincoln-highway_1642262843754.webp', '2022-01-15 17:00:00', 29.44, 1, 1, 'Viking', '2021-10-05', '6.4 X 9.1 X 1.8 inches | 1.9 pounds', 592, 9),
(5, 'Parable of the Sower', 'This acclaimed post-apocalyptic novel of hope and terror from an award-winning author pairs well with 1984 or The Handmaid\'s Tale and includes a foreword by N. K. Jemisin (John Green, New York Times).\r\nWhen global climate change and economic crises lead to social chaos in the early 2020s, California becomes full of dangers, from pervasive water shortage to masses of vagabonds who will do anything to live to see another day. Fifteen-year-old Lauren Olamina lives inside a gated community with her preacher father, family, and neighbors, sheltered from the surrounding anarchy. In a society where any vulnerability is a risk, she suffers from hyperempathy, a debilitating sensitivity to others\' emotions.\r\nPrecocious and clear-eyed, Lauren must make her voice heard in order to protect her loved ones from the imminent disasters her small community stubbornly ignores. But what begins as a fight for survival soon leads to something much more: the birth of a new faith . . . and a startling vision of human destiny.', 'parable-of-the-sower_1642262961282.webp', '2022-01-15 17:00:00', 15.63, 1, 1, 'Grand Central Publishing', '2019-04-30', '5.2 X 7.9 X 1.1 inches | 0.64 pounds', 368, 11),
(6, 'The Intelligent Investor REV Ed.', '\"By far the best book on investing ever written.\" -- Warren Buffett\r\n\r\nThe classic text of Benjamin Graham\'s seminal The Intelligent Investor has now been revised and annotated to update the timeless wisdom for today\'s market conditions.\r\n\r\nThe greatest investment advisor of the twentieth century, Benjamin Graham, taught and inspired people worldwide. Graham\'s philosophy of value investing--which shields investors from substantial error and teaches them to develop long-term strategies--has made The Intelligent Investor the stock market bible ever since its original publication in 1949.\r\n\r\nOver the years, market developments have proven the wisdom of Graham\'s strategies. While preserving the integrity of Graham\'s original text, this revised edition includes updated commentary by noted financial journalist Jason Zweig, whose perspective incorporates the realities of today\'s market, draws parallels between Graham\'s examples and today\'s financial headlines, and gives readers a more thorough understanding of how to apply Graham\'s principles.\r\n\r\nVital and indispensable, this revised edition of The Intelligent Investor is the most important book you will ever read on how to reach your financial goals.', 'the-intelligent-investor-rev-ed_1642263142976.jpeg', '2022-01-15 17:00:00', 22.99, 2, 1, 'Harper Business', '2021-02-21', '5.3 X 8.0 X 1.6 inches | 1.05 pounds', 640, 6),
(7, 'Common Stocks and Uncommon Profits and Other Writings', 'Philip Fisher gilt als einer der Pioniere der modernen Investmenttheorie und zählt zu den einflussreichsten Investoren aller Zeiten.\r\n\r\nSeine Investmentphilosophien, die er vor fast 40 vorgestellt hat, werden nicht nur von modernen Finanzexperten und Investoren - inklusive Warren Buffett - studiert und angewendet, sondern gelten für viele als das Evangelium schlechthin.\r\n\r\nCommon Stocks and Uncommon Profits and Other Writings ist die aktualisierte Broschurausgabe der 1958 erschienenen Originalausgabe.\r\n\r\nDiese Neuauflage stellt Fishers Ideen einer neuen Generation von Investoren vor.\r\n\r\nSie enthält alle Investmentweisheiten der Originalausgabe sowie ein erweitertes Vorwort und eine Einleitung von Philip Fishers Sohn Ken - selbst ein angesehener Investment-Guru. Ken Fisher beschreibt hier, wie dieses Buch sein Privat- und Berufsleben beeinflusst hat und geht ausführlich auf die Investmentleidenschaft seines Vaters ein.\r\n\r\nCommon Stocks and Uncommon Profits and Other Writings - eine unverzichtbare Lektüre für Finanzinteressierte, Anleger und Finanzexperten gleicherma en.\r\n\r\nDie Neuauflage erscheint in neuem Design als Band der Reihe \'Wiley\'s Investment Classics Series\'.', 'common-stocks-and-uncommon-profits-and-other-writings_1642263214092.webp', '2022-01-15 17:00:00', 22.95, 2, 1, 'Wiley', '2003-08-29', '6.04 X 0.85 X 9.0 inches | 0.86 pounds', 292, 6),
(8, 'Stress Test: Reflections on Financial Crises', 'As president of the Federal Reserve Bank of New York and then as President Barack Obama\'s secretary of the Treasury, Timothy F. Geithner helped the United States navigate the worst financial crisis since the Great Depression, from boom to bust to rescue to recovery. In a candid, riveting, and historically illuminating memoir, he takes readers behind the scenes of the crisis, explaining the hard choices and politically unpalatable decisions he made to repair a broken financial system and prevent the collapse of the Main Street economy. This is the inside story of how a small group of policy makers--in a thick fog of uncertainty, with unimaginably high stakes--helped avoid a second depression but lost the American people doing it. Stress Test is also a valuable guide to how governments can better manage financial crises, because this one won\'t be the last.\r\nStress Test reveals a side of Secretary Geithner the public has never seen, starting with his childhood as an American abroad. He recounts his early days as a young Treasury official helping to fight the international financial crises of the 1990s, then describes what he saw, what he did, and what he missed at the New York Fed before the Wall Street boom went bust. He takes readers inside the room as the crisis began, intensified, and burned out of control, discussing the most controversial episodes of his tenures at the New York Fed and the Treasury, including the rescue of Bear Stearns; the harrowing weekend when Lehman Brothers failed; the searing crucible of the AIG rescue as well as the furor over the firm\'s lavish bonuses; the battles inside the Obama administration over his widely criticized but ultimately successful plan to end the crisis; and the bracing fight for the most sweeping financial reforms in more than seventy years.', 'stress-test-reflections-on-financial-crises_1642263340128.jpeg', '2022-01-16 17:00:00', 18.4, 2, 1, 'Crown Publishing Group (NY)', '2005-05-05', '5.0 X 8.0 X 1.3 inches | 0.9 pounds', 592, 98),
(9, 'The Clash of the Cultures: Investment vs. Speculation', 'How speculation has come to dominate investment--a hard-hitting look from the creator of the first index fund.\r\n\r\nOver the course of his sixty-year career in the mutual fund industry, Vanguard Group founder John C. Bogle has witnessed a massive shift in the culture of the financial sector. The prudent, value-adding culture of long-term investment has been crowded out by an aggressive, value-destroying culture of short-term speculation. Mr. Bogle has not been merely an eye-witness to these changes, but one of the financial sector\'s most active participants. In The Clash of the Cultures, he urges a return to the common sense principles of long-term investing.\r\n\r\nProvocative and refreshingly candid, this book discusses Mr. Bogle\'s views on the changing culture in the mutual fund industry, how speculation has invaded our national retirement system, the failure of our institutional money managers to effectively participate in corporate governance, and the need for a federal standard of fiduciary duty.\r\n\r\nMr. Bogle recounts the history of the index mutual fund, how he created it, and how exchange-traded index funds have altered its original concept of long-term investing. He also presents a first-hand history of Wellington Fund, a real-world case study on the success of investment and the failure of speculation. The book concludes with ten simple rules that will help investors meet their financial goals. Here, he presents a common sense strategy that may not be the best strategy ever devised. But the number of strategies that are worse is infinite.', 'the-clash-of-the-cultures-investment-vs-speculation_1642263417069.webp', '2022-01-15 17:00:00', 27.55, 2, 1, 'Wiley', '2012-08-07', '6.39 X 9.24 X 1.26 inches | 1.44 pounds', 384, 6),
(10, 'The Outsiders: Eight Unconventional CEOs and Their Radically Rational Blueprint for Success', '\"An outstanding book about CEOs who excelled at capital allocation.\" -- Warren Buffett\r\n#1 on Warren Buffett\'s Recommended Reading List, Berkshire Hathaway Annual Shareholder Letter, 2012\r\nNamed one of \"19 Books Billionaire Charlie Munger Thinks You Should Read\" in Business Insider.\r\n\"A book that details the extraordinary success of CEOs who took a radically different approach to corporate management.\" -- Charlie Munger, Vice-Chairman of Berkshire Hathaway Corporation\r\n\"Thorndike explores the importance of thoughtful capital allocation through the stories of eight successful CEOs. A good read for any business leader but especially those willing to chart their own course.\" -- Michael Dell, chairman of the board of directors and chief executive officer of Dell\r\nWhat makes a successful CEO? Most people call to mind a familiar definition: \"a seasoned manager with deep industry expertise.\" Others might point to the qualities of today\'s so-called celebrity CEOs--charisma, virtuoso communication skills, and a confident management style. But what really matters when you run an organization? What is the hallmark of exceptional CEO performance? Quite simply, it is the returns for the shareholders of that company over the long term.\r\nIn this refreshing, counterintuitive book, author Will Thorndike brings to bear the analytical wisdom of a successful career in investing, closely evaluating the performance of companies and their leaders. You will meet eight individualistic CEOs whose firms\' average returns outperformed the S&P 500 by a factor of twenty--in other words, an investment of $10,000 with each of these CEOs, on average, would have been worth over $1.5 million twenty-five years later. You may not know all their names, but you will recognize their companies: General Cinema, Ralston Purina, The Washington Post Company, Berkshire Hathaway, General Dynamics, Capital Cities Broadcasting, TCI, and Teledyne.', 'the-outsiders-eight-unconventional-ceos-and-their-radically-rational-blueprint-for-success_1642263516929.webp', '2022-01-15 17:00:00', 29.44, 2, 1, 'Harvard Business Review Press', '2012-10-23', '5.6 X 1.1 X 8.2 inches | 0.85 pounds', 251, 6),
(11, 'Walking the High Desert: Encounters with Rural America Along the Oregon Desert Trail', 'Former high desert rancher Ellen Waterston writes of a wild, essentially roadless, starkly beautiful part of the American West. Following the recently created 750-mile Oregon Desert Trail, she embarks on a creative and inquisitive exploration, introducing readers to a \"trusting, naïve, earnest, stubbly, grumpy old man of a desert\" that is grappling with issues at the forefront of national, if not global, concern: public land use, grazing rights for livestock, protection of sacred Indigenous ground, water rights, and protection of habitat for endangered species.\r\n\r\nBlending travel writing with memoir and history, Waterston profiles a wide range of people who call the high desert home and offers fresh perspectives on nationally reported regional conflicts such as the Malheur Wildlife Refuge occupation. Walking the High Desert invites readers--wherever they may be--to consider their own beliefs, identities, and surroundings through the optic of the high desert of southeastern Oregon.', 'walking-the-high-desert-encounters-with-rural-america-along-the-oregon-desert-trail_1642263603378.jpeg', '2022-01-15 17:00:00', 22.92, 3, 1, 'University of Washington Press', '2020-06-22', '5.5 X 8.4 X 0.7 inches | 0.7 pounds', 248, 9),
(12, 'Oregon: Northwest and Central Oregon', 'Featuring nearly 50 of the greatest mountain bike rides in Northwest and Central Oregon, local mountain biker and author Lizann Dunegan leads cyclists to some of the most scenic and varied landscapes in the state. From the northwest corner of Oregon, where rocky coastline meets the pounding waves of the Pacific Ocean, to majestic Mount Hood in the Cascade Mountain Range, to the dry sagebrush desert near Bend--this part of Oregon mesmerizes everyone who passes through. Areas covered include: Portland/Salem, Columbia River Gorge/Hood River/Mount Hood, Eugene and Oakridge, Bend and Central Oregon, the Oregon Coast, and Southwest Washington. Readers will find comprehensive trail descriptions, from beginner to advanced, GPS-quality route maps, accurate route profiles showing the ups and downs of each ride, detailed directions to each trailhead, mile-by-mile directional cues, difficulty ratings, elevation gain, trail contacts, local information, and much more.', 'oregon-northwest-and-central-oregon_1642263725085.jpeg', '2022-01-15 17:00:00', 16.95, 3, 1, 'Falcon Press Publishing', '2003-07-01', '6.04 X 0.75 X 9.14 inches | 1.08 pounds', 304, 2),
(13, 'Rock Climbing Smith Rock State Park: A Comprehensive Guide to More Than 1,800 Routes', 'The comprehensive guide to the place that brought sport climbing to North America--a full-color, thoroughly updated new edition Smith Rock State Park. It was on the impressive crags of this Oregon hideaway that American sport climbing came into its own, and to this day, some of the hardest climbs in the United States are found on these walls. Alan Watts, who has played a leading role in the development of this popular rock-climbing destination, details more than 1,700 routes at Smith Rock and the surrounding area. This new edition updates hundreds of routes, includes hundreds of new ones, and has new photos of each crag, wall, and route. No other guide is as comprehensive or thorough, and no author more respected for his intimate knowledge of one of the world\'s most popular climbing destinations.', 'rock-climbing-smith-rock-state-park-a-comprehensive-guide-to-more-than-1800-routes_1642263796069.jpeg', '2022-01-14 17:00:00', 35.23, 3, 1, 'Falcon Press Publishing', '2010-01-01', '6.0 X 1.0 X 9.0 inches | 2.04 pounds', 498, 0),
(14, 'Oregon Geology', 'Because Oregon sits on the leading edge of a moving crustal plate, a striking diversity of geologic events have molded its topography. Over a century of study, a deeper understanding of the region\'s tectonic overprint has emerged. In this timely update to the 2000 edition, Elizabeth and William Orr incorporate that new knowledge, addressing current environmental problems and detailing tectonic hazards. \"Caught between converging crustal plates,\" the Orrs write, \"the Pacific Northwest faces a future of massive earthquakes and tsunamis.\"\r\nA comprehensive treatment of the state\'s geologic history, Oregon Geology moves through Oregon\'s regions to closely examine the unique geologic features of each, from the Blue Mountains to the Willamette Valley, from the high lava Plains to the Coast Range.\r\nThe book includes biographical sketches of notable geologists. It is lavishly illustrated and includes an extensive bibliography.', 'oregon-geology_1642263862442.jpeg', '2022-01-14 17:00:00', 22.95, 3, 1, 'Oregon State University Press', '2012-11-01', '8.5 X 0.9 X 10.9 inches | 1.85 pounds', 304, 0),
(15, 'Trail Running Bend and Central Oregon: Great Loop Trails for Every Season', 'Trail Running Bend and Central Oregon is an extensive guide to the best trail running in one of the country\'s top outdoor destinations. Author and trail runner Lucas Alberg provides detailed descriptions of the area\'s best loop runs, including several new trails added within recent years. From classic high desert runs to the east in the Badlands, to mountain escapes and high alpine scenery to the west in the Cascades, the guide highlights the unique and diverse geography that Central Oregon has to offer.\r\nUnlike other guidebooks, Trail Running Bend and Central Oregon is organized by season, so runners can know when to hit the right trails at the right times throughout the year. The 50 routes described in the book are all located within 65 miles of Bend, which means that trail runners will spend more time doing what they love to do, instead of spending time behind the windshield in anticipation.', 'trail-running-bend-and-central-oregon-great-loop-trails-for-every-season_1642263937312.jpeg', '2022-01-14 17:00:00', 16.51, 3, 1, 'Wilderness Press', '2016-05-17', '6.0 X 8.9 X 0.5 inches | 0.7 pounds', 242, 0),
(16, 'Deserter: Junji Ito Story Collection', 'An ever-increasing malice. A mind-numbing terror. The seeds of horror are sown in this collection of Junji Ito\'s earliest works.\r\nA vengeful family hides an army deserter for eight years after the end of World War II, cocooning him in a false reality where the war never ended. A pair of girls look alike, but they\'re not twins. And a boy\'s nightmare threatens to spill out into the real world...\r\nThis hauntingly strange story collection showcases a dozen of Junji Ito\'s earliest works from when he burst onto the horror scene, sowing fresh seeds of terror.', 'deserter-junji-ito-story-collection_1642264058050.jpeg', '2022-01-15 17:00:00', 21.15, 5, 1, 'Viz Media', '2021-12-21', '6.01 X 8.4 X 1.25 inches | 1.45 pounds', 392, 29),
(17, 'Witch Hat Atelier 1', 'Harry Potter meets Kiki\'s Delivery Service! -AV Club\r\nA beautifully-illustrated story about a girl who longs for magic in her life and learns that, on the inside, she already is what she wishes she could be. Reminiscent of Studio Ghibli, this lushly-drawn story has captured the hearts of fantasy fans worldwide.\r\nIn a world where everyone takes wonders like magic spells and dragons for granted, Coco is a girl with a simple dream: She wants to be a witch. But everybody knows magicians are born, not made, and Coco was not born with a gift for magic. Resigned to her un-magical life, Coco is about to give up on her dream to become a witch...until the day she meets Qifrey, a mysterious, traveling magician. After secretly seeing Qifrey perform magic in a way she\'s never seen before, Coco soon learns what everybody knows might not be the truth, and discovers that her magical dream may not be as far away as it may seem...', 'witch-hat-atelier-1_1642264134600.jpeg', '2022-01-15 17:00:00', 11.95, 5, 1, 'Kodansha Comics', '2019-04-09', '5.5 X 8.1 X 0.8 inches | 0.55 pounds', 192, 1),
(18, 'I Am a Cat Barista Vol. 1', 'Take a coffee break in this supernatural spin on a cat café!\r\nFor some people, the daily grind of city life is exhausting. Yet somewhere between the busy streets there\'s a mysterious cat café that can only be found by weary souls. What\'s on the menu? A delicious drink, specially brewed for each customer...by a cat barista!', 'i-am-a-cat-barista-vol-1_1642264209209.webp', '2022-01-15 17:00:00', 12.87, 5, 1, 'Seven Seas', '2021-11-30', '5.8 X 8.2 X 0.5 inches | 0.35 pounds', 140, 2),
(19, 'One Piece Pirate Recipes', 'Living the life of a pirate requires hearty meals! The master chef Sanji reveals the recipes that power the Straw Hat crew!\r\nYou can\'t become King of the Pirates on an empty stomach! Monkey D. Luffy has defeated dozens of rivals, and that kind of success takes a whole lot of energy! Fortunately, the pirate cook Sanji stands by Luffy\'s side, ready to support his captain with flaming kicks and piping-hot meals! Hearty and filling, Sanji\'s recipes keep the greatest pirate crew in the world well-fed, and his flashy techniques will take your culinary skills to the next level!', 'one-piece-pirate-recipes_1642264267092.webp', '2022-01-16 17:00:00', 18.38, 5, 1, 'Viz Media', '2021-11-23', '7.3 X 10.3 X 0.5 inches | 1.1 pounds', 96, 16),
(20, 'Shiver: Junji Ito Selected Stories', 'A best-of story selection by the master of horror manga.\r\nThis volume includes nine of Junji Ito\'s best short stories, as selected by the author himself and presented with accompanying notes and commentary.\r\nAn arm peppered with tiny holes dangles from a sick girl\'s window... After an idol hangs herself, balloons bearing the faces of their destined victims appear in the sky... An amateur film crew hires an extremely individualistic fashion model and faces a real bloody ending... An offering of nine fresh nightmares for the delectation of horror fans.', 'shiver-junji-ito-selected-stories_1642264331249.jpeg', '2022-01-14 17:00:00', 21.15, 5, 1, 'Viz Media', '2017-12-19', '5.9 X 8.3 X 1.3 inches | 1.5 pounds', 400, 0),
(21, 'Javascript: This book includes: Javascript Basics For Beginners + Javascript Front End Programming + Javascript Back End Programming', 'This book is written in a practical and easy way and offers theory and plenty of practical material. There are explanations and practical examples that help beginners learn fast. Instead of diving deeper into lengthy and boring texts, I tried to get straight to the point for each topic.\r\nI have defined each topic and added an easy to understand explanation to help you understand the concepts and the main keywords that will do the magic in the code. Coupled with the explanation, you will find a code snippet for each topic that is custom written and has been tested for errors. You can copy them and load them up on a web browser to see the results, or you can simply edit them and customize them to understand them well. The choice is yours.\r\nThis book is written in an orderly form with beginner-level topics and progressively tougher topics later on. Here is a rundown of the contents of the book.', 'javascript-this-book-includes-javascript-basics-for-beginners-javascript-front-end-programming-javascript-back-end-programming_1642308350628.jpeg', '2022-01-15 17:00:00', 55.11, 4, 1, 'Ladoo Publishing LLC', '2021-05-24', '6.0 X 9.0 X 1.43 inches | 2.07 pounds', 716, 4),
(22, 'Html, CSS & JavaScript in Easy Steps', 'HTML, CSS & JavaScript in easy steps instructs the reader on each of the three coding languages that are used to create modern web pages: HyperText Markup Language (HTML) tags are used to control the structure of web page content; Cascading Style Sheets (CSS) rules are used to determine how web page content appears; and JavaScript functions are used to provide web page interactivity.\r\n\r\nHTML, CSS & JavaScript in easy steps contains examples and screenshots that illustrate each feature of all three coding languages. You\'ll learn how to create web pages to display text, images, lists, tables, hyperlinks, forms, audio, and video. Each chapter builds your knowledge so by the end of the book you\'ll have gained a sound understanding of HTML markup, CSS rules, and JavaScript functions.\r\n\r\nHTML, CSS & JavaScript in easy steps has an easy-to-follow style that will appeal to anyone who wants to create great functional web pages. It will appeal to programmers who want to quickly add web page coding to their skills set, and to the student who is studying website design at school or college, and to those seeking a career in web development.', 'html-css-javascript-in-easy-steps_1642308586311.jpeg', '2022-01-15 17:00:00', 22.98, 6, 1, 'In Easy Steps', '2020-07-28', '7.2 X 8.8 X 1.0 inches | 2.3 pounds', 480, 3);

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `PkProductCategory_Id` int(11) NOT NULL,
  `CategoryName` varchar(200) NOT NULL,
  `CategoryOrder` int(11) NOT NULL,
  `FkDisplayStatus_Id` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`PkProductCategory_Id`, `CategoryName`, `CategoryOrder`, `FkDisplayStatus_Id`) VALUES
(1, 'History', 1, 1),
(2, 'Business', 2, 1),
(3, 'Travel', 3, 1),
(4, 'Technology', 4, 0),
(5, 'Manga', 5, 1),
(6, '77', 7, 0);

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
  `FkUserGender_Id` tinyint(1) NOT NULL,
  `UserAddress` varchar(200) NOT NULL,
  `FkUserRole_Id` tinyint(2) NOT NULL,
  `FkUserStatus_Id` tinyint(1) NOT NULL,
  `UserImage` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`PkUser_Id`, `UserFullName`, `UserName`, `UserPassword`, `UserEmail`, `FkUserGender_Id`, `UserAddress`, `FkUserRole_Id`, `FkUserStatus_Id`, `UserImage`) VALUES
(8, 'Nguyen Van Long', 'longnv', '$2b$10$pDdSjQfzLe0cGMrCSVK9.OX5gr80BSkZRSrRhYtPpO/aPUkGXpIxG', 'longnvteacher@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 1, 1, 'nguyen-van-long_1644800111934.jpeg'),
(9, 'Tran Cao Minh', 'minhtc', '$2b$10$HQQt2KmXKZzM.crSTIwi2eVzsZT9lF3bUgIOE5dyFA6b3WXT2iMji', 'minhtcps18817@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 1, 1, 'tran-cao-minh_1644772991332.jpeg'),
(10, 'Dao Duc Minh Khoi', 'khoiddm', '$2b$10$o5nmFY50N0QJn64Wcgf9tuxPZBWohEx3m08XOU5y8JQkKdU0AuH2C', 'khoiddmps18818@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 0, 1, 'dao-duc-minh-khoi_1644799906626.jpeg'),
(11, 'Nguyen Dang Thanh', 'thanhnd', '$2b$10$ofd4acQNdLDluoooSmiEj.xfJEanpoxDhi4CshtDMZPTC04BQjnfG', 'thanhndps18819@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 0, 1, 'nguyen-dang-thanh_1644800012538.jpeg'),
(13, 'Le Vinh Ky', 'kylvf', '$2b$10$ZSSUIopuPMR5/E.KDRQVNeiwKabHkwGng.Ym0DgX.Wr9obpWAZCZq', 'kylvps18820@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 0, 1, 'le-vinh-ky_1644800335802.jpeg'),
(14, 'Nguyen Duy Quang', 'quangnd', '$2b$10$ZvUytCb/m.Y8KpqsbilLpuJvsN4NySvm6bzEbQ7JqfBGHRtQJYTbC', 'quangndps18816@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 0, 1, 'nguyen-duy-quang_1644800497965.jpeg'),
(15, 'Bui Huy Hoang', 'hoangbh', '$2b$10$QB98yDJU57u6eI.MhyPpau.JUiUzZjba.sgpdhm6.gNeWLrG0BzJ6', 'hoangbhps18815@fpt.edu.vn', 1, 'Ho Chi Minh - Viet Nam', 0, 1, 'bui-huy-hoang_1644800592986.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `user_gender`
--

CREATE TABLE `user_gender` (
  `PkUserGender_Id` tinyint(1) NOT NULL,
  `GenderName` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_gender`
--

INSERT INTO `user_gender` (`PkUserGender_Id`, `GenderName`) VALUES
(0, 'Female'),
(1, 'Male'),
(2, 'Unisex');

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

-- --------------------------------------------------------

--
-- Table structure for table `user_status`
--

CREATE TABLE `user_status` (
  `PkUserStatus_Id` tinyint(1) NOT NULL,
  `StatusName` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_status`
--

INSERT INTO `user_status` (`PkUserStatus_Id`, `StatusName`) VALUES
(0, 'Locked'),
(1, 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `display_status`
--
ALTER TABLE `display_status`
  ADD PRIMARY KEY (`PkDisplayStatus_Id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`PkProduct_Id`),
  ADD KEY `FkType_Id` (`FkProductCategory_Id`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`PkProductCategory_Id`),
  ADD KEY `FkDisplayStatus_Id` (`FkDisplayStatus_Id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`PkUser_Id`),
  ADD KEY `FkUserGender_Id` (`FkUserGender_Id`),
  ADD KEY `FkUserRole_Id` (`FkUserRole_Id`),
  ADD KEY `FkUserStatus_Id` (`FkUserStatus_Id`);

--
-- Indexes for table `user_gender`
--
ALTER TABLE `user_gender`
  ADD PRIMARY KEY (`PkUserGender_Id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`PkUserRole_Id`);

--
-- Indexes for table `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`PkUserStatus_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `PkProduct_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `PkProductCategory_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `PkUser_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_gender`
--
ALTER TABLE `user_gender`
  MODIFY `PkUserGender_Id` tinyint(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `PkUserRole_Id` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_status`
--
ALTER TABLE `user_status`
  MODIFY `PkUserStatus_Id` tinyint(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FkProductCategory_Id` FOREIGN KEY (`FkProductCategory_Id`) REFERENCES `product_category` (`PkProductCategory_Id`) ON DELETE CASCADE;

--
-- Constraints for table `product_category`
--
ALTER TABLE `product_category`
  ADD CONSTRAINT `FkDisplayStatus_Id` FOREIGN KEY (`FkDisplayStatus_Id`) REFERENCES `display_status` (`PkDisplayStatus_Id`) ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FkUserGender_Id` FOREIGN KEY (`FkUserGender_Id`) REFERENCES `user_gender` (`PkUserGender_Id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FkUserRole_Id` FOREIGN KEY (`FkUserRole_Id`) REFERENCES `user_role` (`PkUserRole_Id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FkUserStatus_Id` FOREIGN KEY (`FkUserStatus_Id`) REFERENCES `user_status` (`PkUserStatus_Id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
