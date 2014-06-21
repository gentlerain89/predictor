CREATE DATABASE  IF NOT EXISTS `predictor` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `predictor`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: predictor
-- ------------------------------------------------------
-- Server version	5.6.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `areas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `center_longtitute` float DEFAULT NULL,
  `center_latitute` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,'Etown Quận Tân Bình',123.231,131.123),(2,'KDL Đầm Sen',233.213,213.234),(3,'KDL Suối Tiên',454.342,342.432),(4,'Phường 7 Quận 5',244.545,243.234),(5,'Phường 6 Quận 5',324.243,345.234),(6,'Chợ đêm Nguyễn Trãi',342.434,424.342),(7,'Phường 1  Quận 11',432.234,424.234),(8,'Phường An Lạc Quận Bình Tân',334.345,533.322),(9,'Phường Bình Trị Đông A Quận Bình Tân',433.453,555.444);
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area_id` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pk_booking_area_idx` (`area_id`),
  KEY `pk_booking_driver_idx` (`driver_id`),
  CONSTRAINT `pk_booking_area` FOREIGN KEY (`area_id`) REFERENCES `areas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `pk_booking_driver` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,1,'2014-06-19 11:34:00',4,0),(2,1,'2014-06-19 11:42:00',NULL,0),(3,1,'2014-06-19 11:36:00',3,0),(4,1,'2014-06-19 11:45:00',NULL,0),(5,1,'2014-06-19 11:50:00',NULL,0),(6,4,'2014-06-19 11:47:00',NULL,0),(7,1,'2014-06-19 11:23:00',3,0),(8,1,'2014-06-19 11:31:00',NULL,0),(9,2,'2014-06-19 11:45:00',1,0),(10,2,'2014-06-19 11:50:00',2,0),(11,3,'2014-06-19 11:16:00',4,0),(12,3,'2014-06-19 11:31:00',NULL,0);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver_travel_logs`
--

DROP TABLE IF EXISTS `driver_travel_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driver_travel_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area_id` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `is_available` int(1) NOT NULL,
  `driver_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pk_log_area_idx` (`area_id`),
  KEY `pk_log_driver_idx` (`driver_id`),
  CONSTRAINT `pk_log_area` FOREIGN KEY (`area_id`) REFERENCES `areas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `pk_log_driver` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver_travel_logs`
--

LOCK TABLES `driver_travel_logs` WRITE;
/*!40000 ALTER TABLE `driver_travel_logs` DISABLE KEYS */;
INSERT INTO `driver_travel_logs` VALUES (1,1,'2014-06-19 11:30:00',1,3),(2,1,'2014-06-19 11:30:00',1,4),(3,1,'2014-06-19 11:30:00',0,5),(4,1,'2014-06-19 12:00:00',0,5),(5,2,'2014-06-19 11:30:00',1,1),(6,2,'2014-06-19 11:30:00',1,2),(7,3,'2014-06-19 11:30:00',0,6),(8,3,'2014-06-19 11:30:00',1,7);
/*!40000 ALTER TABLE `driver_travel_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drivers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `company` varchar(45) NOT NULL,
  `license_plate` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
INSERT INTO `drivers` VALUES (1,'Chuong Nguyen Van','Vinasun','OHX-24345'),(2,'Truong Nguyen','Vinasun','MHJ-32345'),(3,'Linh Phan','Vinasun','JUH-23424'),(4,'Tong Nguyen','MaiLinh','MHJ-32343'),(5,'Tam Phan ','MaiLinh','MHJ-33452'),(6,'Nguyễn Văn Hạnh','MaiLinh','MHF-21338'),(7,'Nguyễn Tùng Sơn','MaiLinh','MHE-32422');
/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-06-21 23:02:59
