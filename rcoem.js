const puppeteer = require('puppeteer');
const BASE_URL = `https://rcoem.in`;
const rcoem = {
    browser: null,
    page: null,
    initialize: async () => {
        rcoem.browser = await puppeteer.launch({
            headless: false
        });
        rcoem.page = await rcoem.browser.newPage();
    },
    login: async (username, password) => {
        await rcoem.page.goto(BASE_URL, {
            waitUntil: "networkidle2"
        });
        await rcoem.page.waitForXPath('//button[contains(text(),"Login")]');
        await rcoem.page.type('input[type="username"]', username, {
            delay: 50
        });
        await rcoem.page.type('input[type="password"]', password, {
            delay: 50
        });
        let loginButton = await rcoem.page.$x('//button[contains(text(),"Login")]');
        await loginButton[0].click();
        await rcoem.page.waitForSelector('.profileDash');
        // //clicking on not now

        // await instagram.page.waitForXPath('//button[contains(text(),"Not Now")]');
        // let notSaveButton = await instagram.page.$x('//button[contains(text(),"Not Now")]');
        // await notSaveButton[0].click();
        // await instagram.page.waitForSelector('img[data-testid="user-avatar"]');

    },
    feedback: async () => {
        await rcoem.page.goto('https://rcoem.in/stu_instituteFeedbackStudent.htm', {
            waitUntil: "networkidle2"
        })
        for (let j = 0; j < 9; j++) {
            await rcoem.page.waitForSelector('#cmbFeedbackPlans');
            await rcoem.page.select("select#cmbFeedbackPlans", "91");
            await rcoem.page.waitForSelector('#divFacultyFeedbackDetail');
            let tables = await rcoem.page.$$('td[style="text-align:center"] input');
            let temp = tables.length % 5;
            for (let i = 0; i < tables.length; i += 5) {
                let table = tables[i];
                await table.click();
            }
            if (temp > 0) {
                let extra = tables[tables.length - 2];
                await extra.click();
            }
            let saveBtn = await rcoem.page.$('input[value="Save and Next"]');
            await saveBtn.click();
        }
        let submitBtn = await rcoem.page.$('input[value="Submit"]');
        if (submitBtn)
            submitBtn.click();
    },

}

module.exports = rcoem;