-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: medikart
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `address` text NOT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,1,'New Address Line','560001','2025-05-22 14:41:04'),(2,1,'tarfa','828305','2025-05-22 14:46:15'),(3,1,'dhanbdad','736373','2025-05-22 14:54:02');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultations`
--

DROP TABLE IF EXISTS `consultations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consultations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `symptoms` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `medicines` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultations`
--

LOCK TABLES `consultations` WRITE;
/*!40000 ALTER TABLE `consultations` DISABLE KEYS */;
INSERT INTO `consultations` VALUES (1,'Rajesh Mahato','fever','2025-04-10 08:15:29',NULL),(2,'sabita devi','fever','2025-04-10 08:15:48',NULL),(3,'Anika lala','fever','2025-04-17 18:48:31',NULL),(4,'ronak','headache','2025-05-22 16:47:01',NULL),(5,'roro','headache','2025-05-22 17:28:59',NULL),(6,'sabita devi','fever','2025-05-22 17:45:24',NULL),(7,'sabita devi','fever','2025-05-22 17:48:18',NULL),(8,'MAHI KUMARI','fever','2025-05-22 17:48:41',NULL),(9,'sabita devi','fevr','2025-05-22 17:55:22',NULL),(10,'ayush','fever','2025-05-22 17:56:06',NULL),(11,'Anika lala','fever','2025-05-22 18:02:21','[{\"name\":\"Paracetamol\",\"dosage\":\"500mg twice a day\"}]'),(12,'Anika lala','cough','2025-05-22 18:02:56','[{\"name\":\"Benadryl\",\"dosage\":\"2 tsp thrice a day\"}]');
/*!40000 ALTER TABLE `consultations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicines`
--

DROP TABLE IF EXISTS `medicines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `dosage` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines`
--

LOCK TABLES `medicines` WRITE;
/*!40000 ALTER TABLE `medicines` DISABLE KEYS */;
INSERT INTO `medicines` VALUES (1,'Paracetamol','Calpol','Pain Relief',NULL),(2,'Ibuprofen','Advil','Pain Relief',NULL),(3,'Cetirizine','Zyrtec','Allergy',NULL),(4,'Amoxicillin','Mox','Antibiotic',NULL),(5,'Metformin','Glyciphage','Diabetes',NULL);
/*!40000 ALTER TABLE `medicines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `medicine` varchar(100) DEFAULT NULL,
  `base_price` decimal(10,2) DEFAULT NULL,
  `gst` decimal(10,2) DEFAULT NULL,
  `delivery` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'Pain Relief',50.00,9.00,40.00,99.00,'UPI','2025-05-21 09:46:44'),(2,'Pain Relief',50.00,9.00,40.00,99.00,'UPI','2025-05-21 09:55:04'),(3,'Pain Relief',50.00,9.00,40.00,99.00,'UPI','2025-05-21 09:55:07'),(4,'Pain Relief',50.00,9.00,40.00,99.00,'Cash on Delivery','2025-05-21 09:55:15'),(5,'Pain Relief',50.00,9.00,40.00,99.00,'Cash on Delivery','2025-05-21 09:55:42'),(6,'Pain Relief',50.00,9.00,40.00,99.00,'Cash on Delivery','2025-05-21 09:58:38'),(7,'Pain Relief',50.00,9.00,40.00,99.00,'Cash on Delivery','2025-05-21 09:58:41'),(8,'Pain Relief',50.00,9.00,40.00,99.00,'UPI','2025-05-21 09:58:55'),(9,'Pain Relief',50.00,9.00,40.00,99.00,'UPI','2025-05-21 09:59:52'),(10,'Pain Relief',50.00,9.00,40.00,99.00,'UPI','2025-05-22 14:47:03'),(11,'Pain Relief',50.00,9.00,40.00,99.00,'Cash on Delivery','2025-05-22 14:47:10'),(12,'Pain Relief',50.00,9.00,40.00,99.00,'Card','2025-05-22 14:47:15'),(13,'Pain Relief',50.00,9.00,40.00,99.00,'UPI','2025-05-22 14:53:11'),(14,'Pain Relief',50.00,9.00,40.00,99.00,'Cash on Delivery','2025-05-22 14:53:17'),(15,'Pain Relief',50.00,9.00,40.00,99.00,'Card','2025-05-22 14:53:37');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mahi kumari','mahikri1826@gmail.com','$2b$10$mH9m9vyQao4t8PHIK16wE.mVYiqffqgCaYL7lTo9BfVjBfMdBYpGi','2025-04-11 08:28:41'),(8,'Ma','mahikri18@gmail.com','$2b$10$02qfeeSunrUblXbEVVrv2.xm0AmvblXPLrhQjWGtcU2y6pb/Kfv.a','2025-04-11 08:38:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-24 11:53:32
