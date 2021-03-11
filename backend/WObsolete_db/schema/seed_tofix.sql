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
CREATE TABLE IF NOT EXISTS Products (
  product_id varchar(127) PRIMARY KEY not null,
  title varchar(255) not null,
  description text not null,
  created_on TIMESTAMP,
  price VARCHAR,
  reviews INT,
  category VARCHAR,
  image VARCHAR
);
Insert INTO
  Users (
    ID,
    first_name,
    last_name,
    email,
    password,
    mobile,
    zipCode,
    country,
    isAdmin
  )
VALUES
  (
    '1',
    'uday',
    'kakkar',
    'udaykakkar',
    'uday@123',
    '12345',
    '23445657',
    'canada',
    'false'
  ),
  (
    '2',
    'john',
    'fernadis',
    'johnfernadis',
    'john@123',
    '98765',
    '98445657',
    'canada',
    'false'
  );
Insert INTO
  Products (
    product_id,
    title,
    description,
    created_on,
    price,
    reviews,
    category,
    image
  )
VALUES
  (
    '1',
    'name signs',
    'Name Sign - Wooden Name Sign - Name - Personalized Wall Sign',
    '2021-01-19 03:14:07',
    '85',
    3,
    'name planque',
    'http://jsdbhjsbd'
  ),
  (
    '2',
    'growth chart',
    'personalized wooden growth chart wooden growth ruler wood growth chart personalized name wooden numbers engraved lines',
    '2021-01-19 03:14:07',
    '100',
    4,
    'toys',
    'http://jsdbhjsbd'
  );