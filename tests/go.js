import { chromium, firefox } from 'playwright';


async function goTest() {
    const chrome = await chromium.launch({headless: false});
    const context = await chrome.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3001/');
    for (let i = 0; i < 10; i++) {
        await page.click('#sendHello');
    }
    await page.screenshot({path: `test-screenshots/go-chrome.png`});
    console.log('Go screenshot (chrome) taken');
    await chrome.close();

    const fox = await firefox.launch({headless: false});
    const context2 = await fox.newContext();
    const page2 = await context2.newPage();
    await page2.goto('http://localhost:3001/');
    for (let i = 0; i < 10; i++) {
        await page2.click('#sendHello');
    }
    await page2.screenshot({path: `test-screenshots/go-ff.png`});
    console.log('Go screenshot (firefox) taken');
    await fox.close();
}

export default goTest;
