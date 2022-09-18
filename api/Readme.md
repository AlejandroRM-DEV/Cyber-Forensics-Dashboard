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
CREATE TABLE `requests` (
  `request_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `agency` varchar(100) NOT NULL,
  `ci_num` int(10) unsigned NOT NULL,
  `ci_year` int(10) unsigned NOT NULL,
  `o_num` int(10) unsigned DEFAULT NULL,
  `o_year` int(10) unsigned DEFAULT NULL,
  `o_date` date NOT NULL,
  `date` date NOT NULL,
  `citizen` varchar(100) DEFAULT NULL,
  `closed` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
```