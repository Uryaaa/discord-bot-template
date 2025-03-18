const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const buttonsPath = path.join(__dirname, '../components/buttons');
    const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

    for (const file of buttonFiles) {
        const button = require(path.join(buttonsPath, file));
        client.buttons.set(button.customId, button);
    }

    console.log('✅ Buttons loaded!');
};
