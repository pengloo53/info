# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.20)
# Database: info
# Generation Time: 2018-03-11 14:25:26 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table fom_office
# ------------------------------------------------------------

LOCK TABLES `fom_office` WRITE;
/*!40000 ALTER TABLE `fom_office` DISABLE KEYS */;

INSERT INTO `fom_office` (`id`, `deptId`, `office`, `owner`, `preparation`, `bz`, `createdAt`, `updatedAt`, `deletedAt`)
VALUES
	(2,3,'B1 应用系统科','张美荣',5,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(3,3,'B1 IT 科','孙双成',11,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(4,1,'重点项目企划科','鲁鹏',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(5,1,'标准化科','李杰',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(6,4,'B2 应用系统科','曾勋',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(7,4,'B2 IT 科','沈勇',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(8,5,'B3 应用系统科','刘振',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(9,5,'B3 IT 科','顾今',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(10,6,'B4 应用系统科','徐皛',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(11,6,'B4 IT 科','赵盼辉',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(12,7,'B5 应用系统科','杜俊雅',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(13,7,'B5 IT 科','侍天航',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(14,8,'B6 应用系统科','杨建平',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(15,8,'B6 IT 科','李鹏程',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(16,9,'B7 应用系统科','李延龙',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(17,9,'B7 IT 科','董志刚',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(18,10,'B8 应用系统科','王石刚',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(19,10,'B8 IT 科','陈俊松',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(20,11,'B9 应用系统科','徐炎',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(21,11,'B9 IT 科','王亚坤',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(22,12,'B10 应用系统科','陈慧芳',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(23,12,'B10 IT 科','沈鑫',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(24,13,'B11 应用系统科','黄辅友',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(25,13,'B11 IT 科','杨凯',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(26,14,'B12 应用系统科',NULL,3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(27,14,'B12 IT 科',NULL,3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(28,15,'BMDT 应用系统科','张书楠',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(29,15,'BMDT IT 科','张威',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(30,16,'B17 应用系统科','李昕',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(31,16,'B17 IT 科',NULL,3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(32,2,'流程管理科','汪雯',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL),
	(33,2,'系统运维科','马诗琴',3,'yyy','2018-03-09 01:11:04','2018-03-09 01:11:04',NULL);

/*!40000 ALTER TABLE `fom_office` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fom_staff
# ------------------------------------------------------------

LOCK TABLES `fom_staff` WRITE;
/*!40000 ALTER TABLE `fom_staff` DISABLE KEYS */;

INSERT INTO `fom_staff` (`id`, `deptId`, `officeId`, `name`, `userid`, `gender`, `birthday`, `birth_place`, `education`, `school`, `major`, `work_date`, `enter_date`, `grade`, `mainPost`, `subPost`, `postType`, `postDescribe`, `state`, `bz`, `createdAt`, `updatedAt`, `deletedAt`)
VALUES
	(1,1,NULL,'朱博雅',NULL,'女',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'专家','部长',NULL,'部长','负责部门','在岗',NULL,'2018-03-11 00:00:00','2018-03-11 00:00:00',NULL),
	(2,1,4,'鲁鹏','118663','男','1989-05-03','湖北武汉','硕士','河北工业大学','计算机应用技术','2014-02-24','2014-02-24','高级','科长',NULL,'科长','1. 负责科室所有工作事项','在岗',NULL,'2018-01-01 00:00:00','2018-01-01 00:00:00',NULL),
	(3,2,NULL,'魏晓明','108040','女',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'资深','部长',NULL,'部长','负责应用系统部','在岗',NULL,'2018-03-11 00:00:00','2018-03-11 00:00:00',NULL);

/*!40000 ALTER TABLE `fom_staff` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
