//cp ./html/rust.html to ./Rust-server/ 

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();
const rustServerPath = path.join(__dirname, 'Rust-server');
const bunServerPath = path.join(__dirname, 'ws-bun-test');
import rustTest from './tests/rust.js';
import bunTest from './tests/bun.js';

async function testRust() {
    //copy ./html/rust.html to ./Rust-server/ asyncronously
    await fs.copyFile(path.join(__dirname, 'html', 'rust.html'), path.join(rustServerPath, 'rust.html'), (err) => {
        if (err) throw err;
        console.log('rust.html was copied to Rust-server');
    });
    //start Rust-server
    const p = exec('cargo run', { cwd: rustServerPath }, (err, stdout, stderr) => {
        console.log(stdout);
    });
    console.log("Rust-server started at: http://localhost:8000/rust.html");

    await rustTest();
    //end Rust-server
    p.kill('SIGINT');
    console.log("Rust-server stopped");
    return;
}

async function testBun() {
    //copy ./html/bun.html to ./ws-bun-test/ asyncronously
    await fs.copyFile(path.join(__dirname, 'html', 'bun.html'), path.join(bunServerPath, 'index.html'), (err) => {
        if (err) throw err;
        console.log('bun.html was copied to ws-bun-test');
    });
    //start ws-bun-test
    const p = exec('bun run index.ts', { cwd: bunServerPath }, (err, stdout, stderr) => {
        console.log(stdout);
    });
    console.log("ws-bun-test started at: http://localhost:3000/");

    await bunTest();
    //end ws-bun-test 
    p.kill('SIGINT');
    console.log("ws-bun-test stopped");
    return;
}

async function startAll() {
    await testRust();
    await testBun();
}

startAll();
