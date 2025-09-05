const fs = require('fs').promises;
const { logger } = require('../utils/logger.js');

// read file from data.json
// https://www.w3schools.com/nodejs/nodejs_filesystem.asp

const readItems = async () => {
    try {
        const data = await fs.readFile('data.json', 'utf-8');
        const parsedData = await JSON.parse(data);
        logger.info(`returning parsed Data from itemDao. Data: ${data}`); // for demo purposes
        return parsedData;
    } catch (err) {
        logger.error(`error occured in itemDao: ${err}`);
        return;
    }
}

// write item to data.json
const writeItem = async (item) => {
    try {
        await fs.writeFile('data.json', item, 'utf-8');
        logger.info(`item has been written in itemDao.`); // for demo purposes
    } catch (err) {
        logger.error(`error occured in itemDao: ${err}`);
    }
    return;
}

module.exports = {
    readItems,
    writeItem
}