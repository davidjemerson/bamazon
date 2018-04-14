DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
	id INT(10) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(255) NOT NULL,
	department_name VARCHAR(255) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(10) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dungeon Master's Guide", "Books", 49.95, 100), ("TV", "Electronics", 1299.00, 50), ("Oreos", "Food", 2.90, 1000), ("Desk", "Office Furniture", 225.00, 37), ("Shoes", "Clothing", 60.00, 129), ("Becho Plus", "Electronics", 127.97, 8423), ("Toothbrush", "Personal Care", 2.25, 922), ("Circular Saw", "Power Tools", 135.55, 88), ("Messenger Bag", "Bags", 97, 1123), ("Golf Irons", "Sporting Goods", 375, 1);