const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const modalsPath = path.join(__dirname, '../components/modals');
    const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'));

    for (const file of modalFiles) {
        const modal = require(path.join(modalsPath, file));
        client.modals.set(modal.customId, modal);
    }

    console.log('✅ Modals loaded!');
};
