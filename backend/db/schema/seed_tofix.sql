DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Product CASCADE;
CREATE TABLE IF NOT EXISTS Users (
  ID varchar(127) PRIMARY KEY not null,
  first_name varchar(127) not null,
  last_name varchar(127) not null,
  email varchar(127) not null,
  password char(127),
  mobile VARCHAR(10),
  zipCode varchar(31),
  country varchar(127),
  isAdmin boolean
);
CREATE TABLE Product (
  product_id varchar(127) PRIMARY KEY not null,
  title varchar(255) not null,
  description text not null,
  created_on TIMESTAMP NOT NULL,
  price VARCHAR,
  rewiews VARCHAR,
  category VARCHAR
);