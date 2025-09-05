const http = require('http');
const { getItems, addItem, buyItem, deleteItem } = require('./service/itemService.js');
// const { grocery_list } = require('./data.json');

const PORT = 3000; 

const server = http.createServer((req, res) => {
    let body = "";

    req
        .on('data', (chunk) => {
            body += chunk;
        })
        .on("end", async () => {
            body = body.length > 0 ? JSON.parse(body) : {};
            const { itemName, quantity, price } = body;
            // let id = parseInt(req.url.split("/")[2]); // currently using unique itemName (not id)
            const contentType = {"Content-Type": "application/json"};

            if (req.url.startsWith("/items")) {
                switch(req.method){
                    case('GET'):
                        let data = await getItems();
                        if (!data) {
                            res.writeHead(400, contentType); // 400 Bad Request
                            res.end(JSON.stringify({message: "There is no data to display."}))
                        } else {
                            res.statusCode = 200;
                            res.end(JSON.stringify(data)); 
                        }
                        break;
                    case('POST'):
                        if (!itemName || !quantity || !price) {
                            res.writeHead(400, contentType);
                            res.end(JSON.stringify({message: "Please provide a valid itemName, quantity, and price."}))
                        } else {
                            try {
                                addItem(itemName, quantity, price);
                                res.statusCode = 201; // item created
                                res.end(JSON.stringify({message: "Item has been successfully added to grocery list."}));
                            } catch (err) {
                                console.error(err);
                            }
                        }
                        break;
                    case('PUT'):
                    // also check if if item exists in list - send 400 if not 
                        let purchaseSuccess = !itemName ? false : await buyItem(itemName);
                        if (purchaseSuccess === false) {
                            res.writeHead(400, contentType);
                            res.end(JSON.stringify({message: "Please provide a valid item name to purchase."}))
                        } else {
                            res.statusCode = 200; // item updated
                            res.end(JSON.stringify({message: `You have successfully purchased: ${itemName}.`})); 
                        }
                        break;
                    case('DELETE'):
                        const deleteSuccess = !itemName ? false : await deleteItem(itemName);
                        if (deleteSuccess === false) {
                            res.writeHead(400, contentType);
                            res.end(JSON.stringify({message: "Please provide a valid item name to remove."}))
                        } else {
                            res.statusCode = 200; // item removed 
                            res.end(JSON.stringify({message: "Item has been successfully deleted from grocery list."}));
                        }
                        break;
                    default:
                        res.statusCode = 405; // Method Not Allowed
                        res.end(JSON.stringify({message: "Method Not Found."}));
                }   
            }
        });
})

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})