var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("-----------------------------");
	console.log("Welcome to Bamazon!");
	console.log("-----------------------------");
	displayProducts();
});

function displayProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		for (var i = 0 ; i < res.length ; i++) {
			console.log(res[i].id + " | Item: " + res[i].product_name + " | Price: $" + res[i].price);
		}
		buyStuff();
	});
}

function buyStuff() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'id',
			message: 'Which item would you like to purchase?'
		},
		{
			type: 'input',
			name: 'qty',
			message: 'How many?'
		}
	]).then(function(res) {
		var id = res.id;
		var qty = res.qty;

		connection.query('SELECT * FROM products WHERE ?', {id: id}, function(err, result) {
			if (err) throw err;
			if (result.length === 0) {
				console.log("Invalid item number. Please select a valid item.");
				console.log("---------------------------");
				displayProducts();
			}
			else {
				var itemInfo = result[0];
				if (qty <= itemInfo.stock_quantity) {
					console.log("Order placed!");
					var updatedQuery = 'UPDATE products SET stock_quantity = ' + (itemInfo.stock_quantity - qty) + ' WHERE id = ' + id;
					connection.query(updatedQuery, function(err, res) {
						console.log("Order total is $" + qty * itemInfo.price);
						console.log("---------------------------");
						displayProducts();
					});
				}
				else {
					console.log("Insufficient stock for that quantity. Please revise your order.");
					console.log("---------------------------");
					displayProducts();
				}
			}
		});
	});
}