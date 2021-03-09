
DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users (
  first_name varchar(127) not null,
  last_name varchar(127) not null,
  email varchar(127) not null,
  password char(127),
  addr_line1 varchar(255),
  addr_line2 varchar(255) ,
  city varchar(127) ,
  postcode varchar(31) ,
  country varchar(127)
);
