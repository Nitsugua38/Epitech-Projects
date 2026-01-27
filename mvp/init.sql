CREATE TABLE user (
    ID INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID)
);

CREATE TABLE posts (
    ID INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    likecount INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(ID) ON DELETE CASCADE,
    PRIMARY KEY (ID)
);

INSERT INTO  user (email, password, name)
VALUES ('user1@epitech.eu', 'drowssap', 'User 1');

INSERT INTO  posts (title, description, user_id)
VALUES ('lorem ipsum', 'sample post', '1');