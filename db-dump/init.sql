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
    is_identified bool,
    avatar varchar(255),
    auth varchar(255),
    primary key(user_id)
);

--Table Services--

CREATE TABLE Services(
    service_id int,
    name varchar(255) not null
);

INSERT INTO Services(service_id, name) VALUES (10, 'Reddit');
INSERT INTO Services(service_id, name) VALUES (20, 'League of legends');
INSERT INTO Services(service_id, name) VALUES (30, 'Weather');


--Table Link User to Service--

CREATE TABLE Services(
    id_service int,
    id_user int
);