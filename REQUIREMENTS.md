# API integration guide

 ## Note: Postman collection included 
---------
###  postman Collection link
https://www.getpostman.com/collections/41553240e89532125841
## API Endpoints


#### Users
- Register `/user/register` [POST] 
- Login `/user/login` [POST] 


#### Users Dashboard
- Get All Users `/user/` [GET] [token required]
- Get One User By id `/user/:id` [GET] [token required]


#### Products
- Index `/product` [GET] 
- Create `/product/create` [POST] [token required]
- Read `/product/:id` [GET] 
- Update `/product/:id` [PUT] [token required]
- Delete `/product/:id` [DELETE] [token required]


#### Orders
- Create New Order `/order/new` [POST] [open cart if no open exist][token required]
- Get My Orders `/showmyorders/` [GET] [token required]
- Add To Current Order `/addtocart` [POST] [token required]
- Submit Current opened Order `/supmitorder/:id` [POST] [token required]
- Get Order Details `/orderdetails/:id` [GET] [token required]



---------------------------


## Data Shapes
#### Product
Table: *products*
- id `SERIAL PRIMARY KEY`
- productname `VARCHAR`
- productprice `INTEGER`

#### User
Table: *users*
- id `SERIAL PRIMARY KEY`
- username `VARCHAR`
- userfullname `VARCHAR`
- userpassword `VARCHAR`

#### Orders
Table: *orders*
- id `SERIAL PRIMARY KEY`
- userid `INTEGER` `REFERENCES users(id)`
- status `STRING` [Open,Submited]

Table: *orderitems*
- orderid `INTEGER` `REFERENCES orders(id)` 
- productid `INTEGER` `REFERENCES products(id)`
- quantity `INTEGER`



--------

## Database Schema


#### User

    id VARCHAR(100) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    userfullname VARCHAR(100),
    userpassword VARCHAR(200)
#### Product

    id SERIAL PRIMARY KEY,
    productname VARCHAR(100) NOT NULL,
    productprice INT NOT NULL,


#### Order

    id SERIAL PRIMARY KEY,
    userid VARCHAR(100) REFERENCES users(id),
    status VARCHAR(10),

    Order Items is one-to-many relationship with the orders and products table. This table will be used to add multiple products in one order. This will hold orderId from orders table and productId from products table. The order_products table will have below schema.

    id SERIAL PRIMARY KEY,
    orderid INTEGER REFERENCES orders(id),
    productid INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1
----
###  postman Collection code to import

--------
```

{
	"info": {
		"_postman_id": "3753a254-85bd-442d-b986-fb42ec1fffdd",
		"name": "Storefront Udacity project 2",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Users",
			"item": [
				{
					"name": "Register",
					"request": {
						"auth": {
							"type": "noauth"
						},
						"method": "POST",
						"header": [
							{
								"key": "userid",
								"value": "1",
								"type": "text",
								"disabled": true
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"username\": \"mahmoud2\",\r\n    \"userfullname\":\"Mahmoud Elebiare\",\r\n    \"userpassword\":\"1234566\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/user/register",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"user",
								"register"
							]
						}
					},
					"response": []
				},
				{
					"name": "Login",
					"request": {
						"auth": {
							"type": "noauth"
						},
						"method": "POST",
						"header": [
							{
								"key": "userid",
								"value": "1",
								"type": "text",
								"disabled": true
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"username\": \"mahmoud2\",\r\n    \"userfullname\":\"Mahmoud Elebiare\",\r\n    \"userpassword\":\"1234566\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/user/login",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"user",
								"login"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Products",
			"item": [
				{
					"name": "GetAll",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmZ1bGxuYW1lIjoiTWFobW91ZCBFbGViaWFyZSIsInVzZXJuYW1lIjoibWFobW91ZCIsInVzZXJwYXNzd29yZCI6IiQyYiQxMCRocWdSOE00MlNsWTBNbzlPNmpqdlJ1U2NXaWY2bWo1ZWJmYjJOTTJUbnFaL2pCaGFENEFDRyIsInRva2VuIjpudWxsLCJpYXQiOjE2NDQ3NjYxNjR9.-u-bx-yP8zYJt9wN4b4nF8VgkmQ40SWtZolxd09WMQk",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "userid",
								"value": "1",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/product",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"product"
							]
						}
					},
					"response": []
				},
				{
					"name": "Get one Product By ID",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmZ1bGxuYW1lIjoiTWFobW91ZCBFbGViaWFyZSIsInVzZXJuYW1lIjoibWFobW91ZCIsInVzZXJwYXNzd29yZCI6IiQyYiQxMCRocWdSOE00MlNsWTBNbzlPNmpqdlJ1U2NXaWY2bWo1ZWJmYjJOTTJUbnFaL2pCaGFENEFDRyIsInRva2VuIjpudWxsLCJpYXQiOjE2NDQ3NjYxNjR9.-u-bx-yP8zYJt9wN4b4nF8VgkmQ40SWtZolxd09WMQk",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "userid",
								"value": "1",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/product/5",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"product",
								"5"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create Product",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmZ1bGxuYW1lIjoiTWFobW91ZCBFbGViaWFyZSIsInVzZXJuYW1lIjoibWFobW91ZCIsInVzZXJwYXNzd29yZCI6IiQyYiQxMCRocWdSOE00MlNsWTBNbzlPNmpqdlJ1U2NXaWY2bWo1ZWJmYjJOTTJUbnFaL2pCaGFENEFDRyIsInRva2VuIjpudWxsLCJpYXQiOjE2NDQ3NjYxNjR9.-u-bx-yP8zYJt9wN4b4nF8VgkmQ40SWtZolxd09WMQk",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "userid",
								"value": "1",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"productname\": \"test\",\r\n    \"productprice\": 0\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/product",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"product"
							]
						}
					},
					"response": []
				},
				{
					"name": "Edit Product",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmZ1bGxuYW1lIjoiTWFobW91ZCBFbGViaWFyZSIsInVzZXJuYW1lIjoibWFobW91ZCIsInVzZXJwYXNzd29yZCI6IiQyYiQxMCRocWdSOE00MlNsWTBNbzlPNmpqdlJ1U2NXaWY2bWo1ZWJmYjJOTTJUbnFaL2pCaGFENEFDRyIsInRva2VuIjpudWxsLCJpYXQiOjE2NDQ3NjYxNjR9.-u-bx-yP8zYJt9wN4b4nF8VgkmQ40SWtZolxd09WMQk",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [
							{
								"key": "userid",
								"value": "1",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"id\":3,\r\n    \"productname\": \"Mango\",\r\n    \"productprice\": 65\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/product/3",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"product",
								"3"
							]
						}
					},
					"response": []
				},
				{
					"name": "Delete Product",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmZ1bGxuYW1lIjoiTWFobW91ZCBFbGViaWFyZSIsInVzZXJuYW1lIjoibWFobW91ZCIsInVzZXJwYXNzd29yZCI6IiQyYiQxMCRocWdSOE00MlNsWTBNbzlPNmpqdlJ1U2NXaWY2bWo1ZWJmYjJOTTJUbnFaL2pCaGFENEFDRyIsInRva2VuIjpudWxsLCJpYXQiOjE2NDQ3NjYxNjR9.-u-bx-yP8zYJt9wN4b4nF8VgkmQ40SWtZolxd09WMQk",
									"type": "string"
								}
							]
						},
						"method": "DELETE",
						"header": [
							{
								"key": "userid",
								"value": "1",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/product/4",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"product",
								"4"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Orders",
			"item": [
				{
					"name": "Create || Return Open order Copy",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmZ1bGxuYW1lIjoiTWFobW91ZCBFbGViaWFyZSIsInVzZXJuYW1lIjoibWFobW91ZCIsInVzZXJwYXNzd29yZCI6IiQyYiQxMCRocWdSOE00MlNsWTBNbzlPNmpqdlJ1U2NXaWY2bWo1ZWJmYjJOTTJUbnFaL2pCaGFENEFDRyIsInRva2VuIjpudWxsLCJpYXQiOjE2NDQ3NjYxNjR9.-u-bx-yP8zYJt9wN4b4nF8VgkmQ40SWtZolxd09WMQk",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "userid",
								"value": "1",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/order/new",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"order",
								"new"
							]
						}
					},
					"response": []
				},
				{
					"name": "Add to current open order",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmZ1bGxuYW1lIjoiTWFobW91ZCBFbGViaWFyZSIsInVzZXJuYW1lIjoibWFobW91ZCIsInVzZXJwYXNzd29yZCI6IiQyYiQxMCRocWdSOE00MlNsWTBNbzlPNmpqdlJ1U2NXaWY2bWo1ZWJmYjJOTTJUbnFaL2pCaGFENEFDRyIsInRva2VuIjpudWxsLCJpYXQiOjE2NDQ3NjYxNjR9.-u-bx-yP8zYJt9wN4b4nF8VgkmQ40SWtZolxd09WMQk",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "userid",
								"value": "1",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"quantity\":17,\r\n    \"orderid\":2,\r\n    \"productid\":3\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/order/2/addproduct/1",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"order",
								"2",
								"addproduct",
								"1"
							]
						}
					},
					"response": []
				},
				{
					"name": "Submit and Close Order",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmZ1bGxuYW1lIjoiTWFobW91ZCBFbGViaWFyZSIsInVzZXJuYW1lIjoibWFobW91ZCIsInVzZXJwYXNzd29yZCI6IiQyYiQxMCRocWdSOE00MlNsWTBNbzlPNmpqdlJ1U2NXaWY2bWo1ZWJmYjJOTTJUbnFaL2pCaGFENEFDRyIsInRva2VuIjpudWxsLCJpYXQiOjE2NDQ3NjYxNjR9.-u-bx-yP8zYJt9wN4b4nF8VgkmQ40SWtZolxd09WMQk",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "userid",
								"value": "1",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/order/new",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"order",
								"new"
							]
						}
					},
					"response": []
				},
				{
					"name": "Show User Orders",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmZ1bGxuYW1lIjoiTWFobW91ZCBFbGViaWFyZSIsInVzZXJuYW1lIjoibWFobW91ZCIsInVzZXJwYXNzd29yZCI6IiQyYiQxMCRocWdSOE00MlNsWTBNbzlPNmpqdlJ1U2NXaWY2bWo1ZWJmYjJOTTJUbnFaL2pCaGFENEFDRyIsInRva2VuIjpudWxsLCJpYXQiOjE2NDQ3NjYxNjR9.-u-bx-yP8zYJt9wN4b4nF8VgkmQ40SWtZolxd09WMQk",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "userid",
								"value": "1",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/showmyorders",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"showmyorders"
							]
						}
					},
					"response": []
				},
				{
					"name": "Show Order Details",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmZ1bGxuYW1lIjoiTWFobW91ZCBFbGViaWFyZSIsInVzZXJuYW1lIjoibWFobW91ZCIsInVzZXJwYXNzd29yZCI6IiQyYiQxMCRocWdSOE00MlNsWTBNbzlPNmpqdlJ1U2NXaWY2bWo1ZWJmYjJOTTJUbnFaL2pCaGFENEFDRyIsInRva2VuIjpudWxsLCJpYXQiOjE2NDQ3NjYxNjR9.-u-bx-yP8zYJt9wN4b4nF8VgkmQ40SWtZolxd09WMQk",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "userid",
								"value": "1",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:3000/orderdetails/1",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"orderdetails",
								"1"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Admin",
			"item": []
		}
	]
}
```