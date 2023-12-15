import { chromium, firefox } from 'playwright';

async function rustTest() {
    const chrome = await chromium.launch({headless: false});
    const context = await chrome.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:8080/rust.html');
    for (let i = 0; i < 10; i++) {
        await page.click('#sendHello');
    }
    await page.screenshot({path: `test-screenshots/rust-chrome.png`});
    console.log('Rust screenshot (chrome) taken');
    await chrome.close();

    const fox = await firefox.launch({headless: false});
    const context2 = await fox.newContext();
    const page2 = await context2.newPage();
    await page2.goto('http://localhost:8080/rust.html');
    for (let i = 0; i < 10; i++) {
        await page2.click('#sendHello');
    }
    await page2.screenshot({path: `test-screenshots/rust-ff.png`});
    console.log('Rust screenshot (firefox) taken');
    await fox.close();
}

export default rustTest;
