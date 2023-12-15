import { chromium, firefox } from 'playwright';


async function bunTest() {
    const chrome = await chromium.launch({headless: false});
    const context = await chrome.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3000/');
    for (let i = 0; i < 10; i++) {
        await page.click('#sendHello');
    }
    await page.screenshot({path: `test-screenshots/bun-chrome.png`});
    console.log('Bun screenshot (chrome) taken');
    await chrome.close();

    const fox = await firefox.launch({headless: false});
    const context2 = await fox.newContext();
    const page2 = await context2.newPage();
    await page2.goto('http://localhost:3000/');
    for (let i = 0; i < 10; i++) {
        await page2.click('#sendHello');
    }
    await page2.screenshot({path: `test-screenshots/bun-ff.png`});
    console.log('Bun screenshot (firefox) taken');
    await fox.close();
}

export default bunTest;
