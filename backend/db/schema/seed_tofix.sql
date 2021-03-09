
DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users (
  first_name varchar(127) not null,
  last_name varchar(127) not null,
  email varchar(127) not null,
  password char(127),
  mobile VARCHAR(10),
  zipCode varchar(31) ,
  country varchar(127)
);
