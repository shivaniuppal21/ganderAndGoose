-- Seeing as we will be testing out this script alot we can destroy the db before creating everything again
DROP DATABASE IF EXISTS gandergoose;
-- Create the db
CREATE DATABASE gandergoose;
-- Move into the db
\ c gandergoose -- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,(user_id) int(11) NOT NULL,,
  first_name varchar(127) not null,
  last_name varchar(127) not null,
  email varchar(127) not null,
  password char(127) not null,
  addr_line1 varchar(255) not null,
  addr_line2 varchar(255) not null,
  city varchar(127) not null,
  postcode varchar(31) not null,
  country varchar(127) not null,
);
INSERT INTO
  Users (
    id,
    first_name,
    last_name,
    email,
    password,
    addr_line1,
    addr_line2,
    city,
    postcode,
    Country
  )
VALUES
  (
    1,
    'Abraham',
    'Lincoln',
    'abrahamlinoln123@gmail.com',
    'abrahamlincoln',
    '12 Yoho Drive',
    '' 'Kanata' 'K2M 2N1' 'Canada'
  ),
  (
    2,
    'Paul',
    'Rudd',
    'paulrudd@yahoo.com',
    'paulrudd',
    '101 Shirley brook',
    'Morgan grant' 'Foster City' 'Y7U 8SA',
    'USA'
  );
CREATE TABLE IF NOT EXISTS Products (
    pid int(11) NOT NULL,
    category int(11) NOT NULL,
    title varchar(1000) NOT NULL,
    details longtext NOT NULL,
    price int(11) NOT NULL,
    picture longtext NOT NULL
  )
INSERT INTO
  products(
    pid,
    category int(11) NOT NULL,
    title varchar(1000) NOT NULL,
    details longtext NOT NULL,
    price int(11) NOT NULL,
    picture longtext NOT NULL
  )
VALUES
  (
    1,
    1,
    'Name Plate',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    120,
    '12.jpg'
  ),
  (
    2,
    2,
    'Coat Hook',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    139,
    '13.jpg'
  ),
  (
    3,
    2,
    'Coat Hook with Name',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    99,
    '14.jpg'
  ),
  (
    4,
    3,
    'Growth Chart',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    219,
    '15.jpg'
  ),
  (
    5,
    1,
    'Growth Charth with Name',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    120,
    '12.jpg'
  );