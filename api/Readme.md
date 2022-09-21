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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `requests` (
  `request_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `agency` varchar(100) NOT NULL,
  `ci_num` int(10) unsigned NOT NULL,
  `ci_year` int(10) unsigned NOT NULL,
  `letter_num` int(10) unsigned DEFAULT NULL,
  `letter_year` int(10) unsigned DEFAULT NULL,
  `letter_date` date NOT NULL,
  `submission_date` date NOT NULL,
  `authorized_by` varchar(100) DEFAULT NULL,
  `closed` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` varchar(100) NOT NULL DEFAULT '-',
  PRIMARY KEY (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
```