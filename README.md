# grocery_store_api

## User Stories
(1) As a client, you must be able to view the grocery list (GET)
(2) As a client, you must be able to add an Item (POST)
(3) As a client, you must be able to Edit an Item (PUT)
(4) As a client, you must be able to Delete an Item (DELETE)


## Requirements
- utilize Node.js module
- Winston for logging
- persisted data with fs (data.txt file with JSON format)
- http methods and status codes must be visible
- Postman for handling API endpoint testing


## Endpoints
(1) GET => /items                  = gets all items from grocery list
(2) POST => /items                 = adds an item to grocery list
(3) PUT => /items/{itemName}             = updates an item in grocery list (i.e. purchased)
(4) DELETE => /items/{itemName}          = removes an item from grocery list 

(Port: http://localhost:3000/)

## HTTP codes
- 200 => success
- 201 => item created successfully
- 400 => bad request
- 405 => Method Not Allowed https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#client_error_responses

### Example: 

```
groceryList = [
    {
        itemName: "gallon of milk",
        quantity: 1,
        price: 3.15,
        bought: false,
    },
    {
        itemName: "loaf of bread",
        quantity: 1,
        price: 2.50,
        bought: true,
    },
];
```