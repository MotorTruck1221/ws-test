import { chromium, firefox } from 'playwright';

async function rustTest() {
    const chrome = await chromium.launch({headless: false});
    const context = await chrome.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:8080/rust.html');
    for (let i = 0; i < 10; i++) {
        await page.click('#sendHello');
    }
    await page.screenshot({path: `test-screenshots/rust-chrome-basic.png`});
    console.log('Rust screenshot (chrome, basic) taken');
    await chrome.close();

    const fox = await firefox.launch({headless: false});
    const context2 = await fox.newContext();
    const page2 = await context2.newPage();
    await page2.goto('http://localhost:8080/rust.html');
    for (let i = 0; i < 10; i++) {
        await page2.click('#sendHello');
    }
    await page2.screenshot({path: `test-screenshots/rust-ff-basic.png`});
    console.log('Rust screenshot (firefox, basic) taken');
    await fox.close();


    const chrome2 = await chromium.launch({headless: false});
    const context3 = await chrome2.newContext();
    const page3 = await context3.newPage();
    await page3.goto('http://localhost:8080/rust.html');
    for (let i = 0; i < 10; i++) {
        await page3.click('#sendFile');
    }
    await page3.screenshot({path: `test-screenshots/rust-chrome-binary.png`});
    console.log('Rust screenshot (chrome, binary) taken');
    await chrome2.close();

    const fox2 = await firefox.launch({headless: false});
    const context4 = await fox2.newContext();
    const page4 = await context4.newPage();
    await page4.goto('http://localhost:8080/rust.html');
    for (let i = 0; i < 10; i++) {
        await page4.click('#sendFile');
    }
    await page4.screenshot({path: `test-screenshots/rust-ff-binary.png`});
    console.log('Rust screenshot (firefox, binary) taken');
    await fox2.close();
}

export default rustTest;
