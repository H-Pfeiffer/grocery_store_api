const {createLogger, transports, format} = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
    format: combine(
        label({ label: 'info: '}),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new (transports.Console)(),
        new (transports.File)({filename: 'logs/item.log'})
    ]
});

module.exports = {
    logger,
};