-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.18 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for dbschool
CREATE DATABASE IF NOT EXISTS `dbschool` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dbschool`;

-- Dumping structure for table dbschool.assignment
CREATE TABLE IF NOT EXISTS `assignment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `module_id` bigint(20) NOT NULL,
  `file` text,
  `start_date` date NOT NULL DEFAULT '0000-00-00',
  `end_date` date NOT NULL DEFAULT '0000-00-00',
  `description` text NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `fk1_assignment` (`module_id`),
  CONSTRAINT `fk1_assignment` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table dbschool.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `postid` bigint(20) NOT NULL,
  `user` bigint(20) NOT NULL,
  `body` varchar(50) NOT NULL,
  `timestamp` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table dbschool.conversation
CREATE TABLE IF NOT EXISTS `conversation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `recep_id` bigint(20) NOT NULL,
  `topic` varchar(100) NOT NULL,
  `timestamp` datetime NOT NULL,
  `firstmessage` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk-user-convo_idx` (`user_id`),
  KEY `fk-user-convo-recep_idx` (`recep_id`),
  CONSTRAINT `fk-user-convo-recep` FOREIGN KEY (`recep_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk-user-convo-user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table dbschool.course
CREATE TABLE IF NOT EXISTS `course` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `instructor_id` bigint(20) NOT NULL,
  `description` text,
  `module_count` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_course_user` (`instructor_id`),
  CONSTRAINT `FK_course_user` FOREIGN KEY (`instructor_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table dbschool.course_student
CREATE TABLE IF NOT EXISTS `course_student` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `student_id` bigint(20) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_cs` (`student_id`,`course_id`),
  KEY `fk_course_cs` (`course_id`),
  CONSTRAINT `FK_course_student_user` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_course_cs` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table dbschool.databasechangelog
CREATE TABLE IF NOT EXISTS `databasechangelog` (
  `ID` varchar(255) NOT NULL,
  `AUTHOR` varchar(255) NOT NULL,
  `FILENAME` varchar(255) NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `ORDEREXECUTED` int(11) NOT NULL,
  `EXECTYPE` varchar(10) NOT NULL,
  `MD5SUM` varchar(35) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `TAG` varchar(255) DEFAULT NULL,
  `LIQUIBASE` varchar(20) DEFAULT NULL,
  `CONTEXTS` varchar(255) DEFAULT NULL,
  `LABELS` varchar(255) DEFAULT NULL,
  `DEPLOYMENT_ID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table dbschool.databasechangeloglock
CREATE TABLE IF NOT EXISTS `databasechangeloglock` (
  `ID` int(11) NOT NULL,
  `LOCKED` bit(1) NOT NULL,
  `LOCKGRANTED` datetime DEFAULT NULL,
  `LOCKEDBY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table dbschool.discussions
CREATE TABLE IF NOT EXISTS `discussions` (
  `post_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_description` varchar(50) NOT NULL,
  `post_by` bigint(20) NOT NULL,
  `post_title` varchar(50) NOT NULL,
  `post_date` datetime NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table dbschool.file
CREATE TABLE IF NOT EXISTS `file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `upload_date` date NOT NULL,
  `uploaded_by` bigint(20) NOT NULL,
  `assignment_id` bigint(20) NOT NULL,
  `file` text,
  PRIMARY KEY (`id`),
  KEY `FK__assignment` (`assignment_id`),
  KEY `FK_file_user` (`uploaded_by`),
  CONSTRAINT `FK__assignment` FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`id`),
  CONSTRAINT `FK_file_user` FOREIGN KEY (`uploaded_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table dbschool.grade
CREATE TABLE IF NOT EXISTS `grade` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `assignment_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `grade` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__assignment_grade` (`assignment_id`),
  KEY `FK_grade_user` (`user_id`),
  CONSTRAINT `FK__assignment_grade` FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`id`),
  CONSTRAINT `FK_grade_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table dbschool.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user` bigint(20) NOT NULL,
  `recep` bigint(20) NOT NULL,
  `text` varchar(200) NOT NULL,
  `timestamp` datetime NOT NULL,
  `cid` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk-user-msg-recep_idx` (`recep`),
  KEY `fk-user-msg-usr_idx` (`user`),
  CONSTRAINT `fk-user-msg-recep` FOREIGN KEY (`recep`) REFERENCES `user` (`id`),
  CONSTRAINT `fk-user-msg-usr` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table dbschool.module
CREATE TABLE IF NOT EXISTS `module` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(20) NOT NULL DEFAULT '0',
  `title` varchar(400) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `course_id_fk1` (`course_id`),
  CONSTRAINT `course_id_fk1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table dbschool.module_content
CREATE TABLE IF NOT EXISTS `module_content` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `module_id` bigint(20) NOT NULL,
  `video_link` text,
  `video_title` text,
  `transcript` text,
  `file` text,
  PRIMARY KEY (`id`),
  KEY `fk1_module_1` (`module_id`),
  CONSTRAINT `fk1_module_1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table dbschool.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `user_description` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `mobile` bigint(20) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zipcode` bigint(20) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;


INSERT INTO `user` (`id`, `username`, `name`, `password`, `role`, `user_description`, `first_name`, `last_name`, `gender`, `mobile`, `city`, `state`, `zipcode`, `country`, `address`) VALUES (1, 'gauravhasija', 'Gaurav Hasija', '$2a$10$MORPM68jTu7prh5FtmI.D.unluBQ/3G2wKeakd7Syy.4HCryMgD8O', 'TEACHER', 'Fitness is my priority.', 'Gaurav', 'Hasija', '', NULL, 'College Park', '', 20740, 'USA', 'college');
INSERT INTO `user` (`id`, `username`, `name`, `password`, `role`, `user_description`, `first_name`, `last_name`, `gender`, `mobile`, `city`, `state`, `zipcode`, `country`, `address`) VALUES (2, 'bruce', 'Bruce Wayne', '$2a$10$MORPM68jTu7prh5FtmI.D.unluBQ/3G2wKeakd7Syy.4HCryMgD8O', 'TEACHER', 'Fitness is my priority.', 'Gaurav', 'Hasija', '', NULL, 'College Park', '', 20740, 'USA', 'college');
INSERT INTO `user` (`id`, `username`, `name`, `password`, `role`, `user_description`, `first_name`, `last_name`, `gender`, `mobile`, `city`, `state`, `zipcode`, `country`, `address`) VALUES (3, 'clark', 'Clark Kent', '$2a$10$MORPM68jTu7prh5FtmI.D.unluBQ/3G2wKeakd7Syy.4HCryMgD8O', 'TEACHER', 'Fitness is my priority.', 'Gaurav', 'Hasija', '', NULL, 'College Park', '', 20740, 'USA', 'college');
INSERT INTO `user` (`id`, `username`, `name`, `password`, `role`, `user_description`, `first_name`, `last_name`, `gender`, `mobile`, `city`, `state`, `zipcode`, `country`, `address`) VALUES (4, 'diana', 'Dian', '$2a$10$MORPM68jTu7prh5FtmI.D.unluBQ/3G2wKeakd7Syy.4HCryMgD8O', 'TEACHER', 'Fitness is my priority.', 'Gaurav', 'Hasija', '', NULL, 'College Park', '', 20740, 'USA', 'college');



INSERT INTO `course` (`id`, `name`, `instructor_id`, `description`, `module_count`) VALUES (2, 'BMC2: Body Chakras', 1, 'The entire universe is made of energy, and your body is no exception. The 7 chakras play an important role in the balance and health of our bodies. Long before modern technology and science, ancient cultures knew that all living things carried a life force with them. They called the centers of energy that moved inside of us the 7 chakras.', 3);
INSERT INTO `course` (`id`, `name`, `instructor_id`, `description`, `module_count`) VALUES (1, 'BMC1: Beginners', 1, 'Yoga for Beginners guide gives you all the tips, guidelines, and recommendations you will need to start a successful yoga practice. Yoga is in no way exclusive—being able to practice yoga does not matter how old you are, how much you weigh, what you do for a living, where you live or what religion you practice. Yoga is accessible for just about everyone.', 3);
INSERT INTO `course` (`id`, `name`, `instructor_id`, `description`, `module_count`) VALUES (3, 'BMC3: Meditation', 2, 'Meditation isn’t about becoming a different person, a new person, or even a better person. It’s about training in awareness and getting a healthy sense of perspective. You’re not trying to turn off your thoughts or feelings. You’re learning to observe them without judgment. And eventually, you may start to better understand them as well.', 4);
INSERT INTO `course` (`id`, `name`, `instructor_id`, `description`, `module_count`) VALUES (5, 'BMC5: Yoga for Self Love', 3, 'Yoga is an internal journey of self-discovery, an opportunity to connect with your true self on a deeper level. At its core, it is about developing a deep reverence and pure love for your body temple as it houses your conscious spirit. In this way yoga is a beautiful practice for those who suffer from low self-esteem, anxiety and depression as it slowly and lovingly allows a holistic way to heal these emotions from the inside out.', 4);
INSERT INTO `course` (`id`, `name`, `instructor_id`, `description`, `module_count`) VALUES (4, 'BMC4: Yoga for Health', 4, 'Yoga is a practice that connects the body, breath, and mind. It uses physical postures, breathing exercises, and meditation to improve overall health.', 6);



INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (1, 1, '10 minute Morning Yoga for Beginners');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (2, 1, '15 minute Morning Yoga for Beginners WEIGHT LOSS edition');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (3, 1, '10 minute Simple Slow Stretch Yoga Routine');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (5, 1, '20 minute Bedtime Yoga for Beginners Stretch');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (6, 2, 'The 7 Chakras - Meaning & Functions');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (7, 2, 'Align Your All 7 Body Chakras');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (8, 2, 'Unblock all 7 Chakras');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (9, 3, 'How To Meditate For Beginners');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (10, 3, 'Mindful Breathing for Peace and Well-Being');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (11, 3, 'Calm Guided Meditation to Gain Abundance, Love & Happiness');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (12, 4, 'Yoga Asanas for Stomach Disorders and Obesity');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (13, 4, 'Yoga Poses for Back Pain');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (14, 4, 'Yoga for High Blood Pressure');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (15, 4, 'Yoga Poses for Arthritis Relief');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (16, 4, 'Yoga Exercises to Reduce Belly Fat');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (17, 4, 'Everyday Yoga Routine at Home');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (18, 5, 'Yoga To Feel Your Best');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (19, 5, '10-Minute Yoga For Self Care - Yoga');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (20, 5, 'Feel Good Flow - Yoga');
INSERT INTO `module` (`id`, `course_id`, `title`) VALUES (21, 5, 'Freedom Glow Yoga');



INSERT INTO `module_content` (`id`, `module_id`, `video_link`, `video_title`, `transcript`, `file`) VALUES (1, 1, 'https://www.youtube.com/embed/VaoV1PrYft4', '10 minute Morning Yoga for Beginners', 'oin me in this quick and simple 10 minute morning yoga for beginners routine to stretch out stiffness and energize for a great day. Yoga for Beginners Playlist: https://www.youtube.com/playlist?list...  💙 Get the HIPS SLOW STRETCH: http://bit.ly/25minHIPS ', 'src/main/java/com/sha/serverside/files/10 minute Morning Yoga for Beginners.docx');

