import { chromium, firefox } from 'playwright';
import path from 'path';
const __dirname = path.resolve();


async function bunTest() {
    const chrome = await chromium.launch({headless: false});
    const context = await chrome.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3000/');
    for (let i = 0; i < 10; i++) {
        await page.click('#sendHello');
    } 
    await page.screenshot({path: `test-screenshots/bun-chrome-basic.png`});
    console.log('Bun screenshot (chrome, basic) taken');
    await chrome.close();

    const fox = await firefox.launch({headless: false});
    const context2 = await fox.newContext();
    const page2 = await context2.newPage();
    await page2.goto('http://localhost:3000/');
    for (let i = 0; i < 10; i++) {
        await page2.click('#sendHello');
    }
    await page2.screenshot({path: `test-screenshots/bun-ff-basic.png`});
    console.log('Bun screenshot (firefox, basic) taken');
    await fox.close();

    await new Promise(r => setTimeout(r, 5000));

    const chrome2 = await chromium.launch({headless: false});
    const context3 = await chrome2.newContext();
    const page3 = await context3.newPage();
    await page3.goto('http://localhost:3000/');
    for (let i = 0; i < 10; i++) {
        await page3.click('#sendFile');
    }
    await page3.screenshot({path: `test-screenshots/bun-chrome-binary.png`});
    console.log('Bun screenshot (chrome, binary) taken');
    await chrome2.close();

    const fox2 = await firefox.launch({headless: false});
    const context4 = await fox2.newContext();
    const page4 = await context4.newPage();
    await page4.goto('http://localhost:3000/');
    for (let i = 0; i < 10; i++) {
        await page4.click('#sendFile');
    }
    await page4.screenshot({path: `test-screenshots/bun-ff-binary.png`});
    console.log('Bun screenshot (firefox, binary) taken');
    await fox2.close();
}


export default bunTest;
