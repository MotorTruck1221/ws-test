//cp ./html/rust.html to ./Rust-server/ 

import { exec } from 'child_process';
import path from 'path';
const __dirname = path.resolve();
const rustServerPath = path.join(__dirname, 'Rust-server');
const bunServerPath = path.join(__dirname, 'ws-bun-test');
const goServerPath = path.join(__dirname, 'go-test');
import rustTest from './tests/rust.js';
import bunTest from './tests/bun.js';
import goTest from './tests/go.js';

async function testRust() {
    const p = exec('./target/release/server', { cwd: rustServerPath }, (err, stdout, stderr) => {
        console.log(stdout);
    });
    console.log("Rust-server started at: http://localhost:8000/rust.html");
    await rustTest();
    p.kill('SIGINT');
    console.log("Rust-server stopped");
    return;
}

async function testBun() {
    const p = exec('bun build/index.js', { cwd: bunServerPath }, (err, stdout, stderr) => {
        console.log(stdout);
    });
    console.log("ws-bun-test started at: http://localhost:3000/");
    await bunTest();
    p.kill('SIGINT');
    console.log("ws-bun-test stopped");
    return;
}

async function testGo() { 
    const p = exec('./test', { cwd: goServerPath });
    p.stdout.on('data', (data) => {
        console.log(data);
    });
    console.log("go-test started at: http://localhost:3001/");
    await goTest();
    p.kill('SIGINT');
    console.log("go-test stopped");
    return;
}

async function startAll() {
    await testRust();
    await testBun();
    await testGo();
    process.exit(0);
}

startAll();
