CREATE TABLE accounts (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin TINYINT(1) DEFAULT 0,
    balance DECIMAL(10,2) DEFAULT 0.00,
    email VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(24) NOT NULL,
    product_type VARCHAR(32) NOT NULL,
    product_amount INT NOT NULL,
    product_bonus INT NOT NULL,
    product_price INT NOT NULL,
    product_code VARCHAR(50) NOT NULL
);

CREATE TABLE game_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    rating DECIMAL(2,1),
    players VARCHAR(20),
    type VARCHAR(20),
    game_abr VARCHAR(10)
);
