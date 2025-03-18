const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const contextMenusPath = path.join(__dirname, '../components/contextMenus');
    const contextMenuFiles = fs.readdirSync(contextMenusPath).filter(file => file.endsWith('.js'));

    for (const file of contextMenuFiles) {
        const contextMenu = require(path.join(contextMenusPath, file));
        client.contextMenus.set(contextMenu.data.name, contextMenu);
    }

    console.log('✅ Context menus loaded!');
};
