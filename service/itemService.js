const { readItems, writeItem } = require('../repository/itemRepository.js');

const getItems = async () => {
    return await readItems();
}

const addItem = async (itemName, quantity, price) => {
    let item = {
        itemName: itemName.toLowerCase().trim(),
        quantity: parseInt(quantity),
        price: parseFloat(price),
        bought: false,
    }
    const data = await readItems();
    data.grocery_list.push(item);
    await writeItem(JSON.stringify(data));
    return;
}

const buyItem = async (searchItemName) => {
    const data = await readItems();
    const item = data.grocery_list.find(item => item.itemName.toLowerCase() === searchItemName.toLowerCase());
    if (item && item.bought === false) {
        item.bought = true;
        await writeItem(JSON.stringify(data));
        return true;
    } 
    return false;
}

const deleteItem = async (searchItemName) => {
    const data = await readItems();
    const index = data.grocery_list.findIndex(item => item.itemName.toLowerCase() === searchItemName.toLowerCase());
    if (index !== -1) {
        data.grocery_list.splice(index, 1); 
        await writeItem(JSON.stringify(data));
        return true;
    } 
    return false;
}

module.exports = {
    getItems,
    addItem, 
    buyItem,
    deleteItem,
};