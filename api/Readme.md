# ENV
```
PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
AUTH0_AUDIENCE=
AUTH0_ISSUER=
```

# DATABASE
```
CREATE TABLE `agencies` (
  `agency_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`agency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- cfd.requests definition

CREATE TABLE `requests` (
  `request_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('ADQUISICIÓN DE DATOS DE TELÉFONO CELULAR (DISPOSITIVOS MÓVILES)','EXTRACCIÓN DE INFORMACIÓN DE DISPOSITIVOS DE ALMACENAMIENTO DIGITAL','EXTRACCIÓN DE INFORMACIÓN DE SISTEMAS DE GRABACIÓN DE VIDEO','IDENTIFICACIÓN DE EQUIPOS','INFORMES','INVESTIGACIÓN DE SISTEMAS','INVESTIGACIÓN SOBRE SERVICIOS Y APLICACIONES DE INTERNET','VALORACIÓN DE DAÑOS EN EQUIPOS') DEFAULT NULL,
  `agency_id` int(10) unsigned NOT NULL,
  `ci_num` int(10) unsigned NOT NULL,
  `ci_year` int(10) unsigned NOT NULL,
  `letter_num` int(10) unsigned DEFAULT NULL,
  `letter_year` int(10) unsigned DEFAULT NULL,
  `letter_date` date NOT NULL,
  `submission_date` date NOT NULL,
  `authorized_by` varchar(100) DEFAULT NULL,
  `user_id` varchar(100) NOT NULL DEFAULT '-',
  PRIMARY KEY (`request_id`),
  KEY `requests_FK` (`agency_id`),
  CONSTRAINT `requests_FK` FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`agency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```