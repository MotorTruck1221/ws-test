import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();
const rustServerPath = path.join(__dirname, 'Rust-server');
const goServerPath = path.join(__dirname, 'go-test');
const bunServerPath = path.join(__dirname, 'ws-bun-test');

async function buildRust() {
    fs.copyFile(path.join(__dirname, 'html', 'rust.html'), path.join(rustServerPath, 'rust.html'), (err) => {
        if (err) throw err;
        console.log('rust.html was copied to Rust-server');
    });
    exec('cargo build --release', { cwd: rustServerPath }, (err, stdout, stderr) => { console.log(stdout) });
    console.log("Rust-server built");
    return;
}

async function buildGo() {
    exec('go get', { cwd: goServerPath }, (err, stdout, stderr) => { console.log(stdout) });
    exec('go build -o test', { cwd: goServerPath }, (err, stdout, stderr) => { console.log(stdout) });
    console.log("go-server built");
    return;
}

async function buildBun() {
    fs.copyFile(path.join(__dirname, 'html', 'bun.html'), path.join(bunServerPath, 'index.html'), (err) => {
        if (err) throw err;
        console.log('bun.html was copied to ws-bun-test');
    });
    exec('bun install', { cwd: bunServerPath }, (err, stdout, stderr) => { console.log(stdout) });
    exec('bun build index.ts --outdir build/', { cwd: bunServerPath }, (err, stdout, stderr) => { console.log(stdout) });
    console.log("ws-bun-test built");
    return;
}

async function buildPython() {
    exec('pip install -r requirements.txt', { cwd: __dirname });
    console.log("python-test built");
    return;
}

async function buildAll() {
    await buildRust();
    await buildGo();
    await buildBun();
    await buildPython();
    return;
}

buildAll();
