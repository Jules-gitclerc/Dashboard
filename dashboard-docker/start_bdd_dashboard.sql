CREATE DATABASE dashboard;

USE dashboard;

--Table User--

CREATE TABLE User(
    user_id int auto_increment,
    username varchar(255) not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    phone varchar(255) not null,
    avatar varchar(255),
    auth varchar(255),
    is_identified bool,
    primary key(user_id)
);

--Table Services--

CREATE TABLE Services(
    service_id int,
    name varchar(255) not null
);

INSERT INTO Services(id_service, name) VALUES (10, 'Reddit');
INSERT INTO Services(id_service, name) VALUES (20, 'League of legends');
