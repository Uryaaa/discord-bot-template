const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const selectMenusPath = path.join(__dirname, '../components/selectMenus');
    const selectMenuFiles = fs.readdirSync(selectMenusPath).filter(file => file.endsWith('.js'));

    for (const file of selectMenuFiles) {
        const selectMenu = require(path.join(selectMenusPath, file));
        client.selectMenus.set(selectMenu.customId, selectMenu);
    }

    console.log('✅ Select menus loaded!');
};
