const rcoem = require('./rcoem')
require('dotenv').config();
(async () => {
    await rcoem.initialize();
    await rcoem.login(process.env.USERNAME, process.env.PASSWORD);
    await rcoem.feedback();
    //await rcoem.closeBrowser();
})();