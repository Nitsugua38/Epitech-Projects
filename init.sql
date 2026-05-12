CREATE TABLE users (
  id int PRIMARY KEY AUTO_INCREMENT,
  email varchar(255),
  password varchar(255),
  role varchar(255),
  nom varchar(255),
  prenom varchar(255),
  profil_recherche text 
);

CREATE TABLE offers (
  id int PRIMARY KEY AUTO_INCREMENT,
  title varchar(255),
  description text,
  company varchar(255),
  location varchar(255)
);