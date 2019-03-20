const fs = require('fs');


let data;

try {
    const json = fs.readFileSync('./server/data/data.json').toString();
    data = JSON.parse(json);
} catch (error) {
    console.error('There are some issues with the configuration file from data.json', error);
    process.exit(0);
}

module.exports = data;
