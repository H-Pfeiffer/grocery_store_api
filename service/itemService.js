const { readItems, writeItem } = require('../repository/itemRepository.js');

const getItems = async () => {
    try {
        const data = await readItems();
        return data;
    } catch (err) {
        console.error(`Error occured: ${err}`);
        return {message: `error: ${err}`, success: false};
    }
}

const addItem = async (itemName, quantity, price) => {
    try {
        let item = {
            itemName: itemName.toLowerCase().trim(),
            quantity: parseInt(quantity),
            price: parseFloat(price),
            bought: false,
        }
        const data = await readItems();
        data.grocery_list.push(item);
        await writeItem(JSON.stringify(data));
        return {message: `created item: ${item}`};
    } catch (err) {
        console.error(`The following error occured: ${err}`);
        return {message: `error: ${err.message}`, success: false};
    }
}

const buyItem = async (searchItemName) => {
    try {
        const data = await readItems();
        const item = data.grocery_list.find(item => item.itemName.toLowerCase() === searchItemName.toLowerCase());
        if (item && item.bought === false) {
            item.bought = true;
            await writeItem(JSON.stringify(data));
            return {message: `item bought: ${searchItemName}`, success: true};
        } 
    } catch (err) {
        console.error(`Error occured: ${err}`);
        return {message: `error: ${err.message}`, success: false};
    }
}

const deleteItem = async (searchItemName) => {
    const data = await readItems();
    if (data) {
        const index = data.grocery_list.findIndex(item => item.itemName.toLowerCase() === searchItemName.toLowerCase());
        if (index !== -1) {
            data.grocery_list.splice(index, 1); 
            await writeItem(JSON.stringify(data));
            return {message: `item deleted: ${searchItemName}`, success: true};
        } 
    }
    return false;
}

module.exports = {
    getItems,
    addItem, 
    buyItem,
    deleteItem,
};