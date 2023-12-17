# A simple Websocket Test between Bun, Rust, Go, Node.JS and Python


## Results (from the last 4 runs, rounded to 3 decimal places):

### All tests were run on a clean rebooted system with no other applications running.

| Language | Time (ms, avg) | Time (ms, max) | Time (ms, min) | Browser | WS Type |
|----------|-----------------|----------------|----------------|---------|---------|
| Rust     | 0.000           | 0.000          | 0.000          | Chrome  | Message |
| Rust     | 0.000           | 0.000          | 0.000          | Chrome  | Binary  |
| Rust     | 0.000           | 0.000          | 0.000          | Firefox | Message |
| Rust     | 0.000           | 0.000          | 0.000          | Firefox | Binary  |
| Go       | 0.000           | 0.000          | 0.000          | Chrome  | Message |
| Go       | 0.000           | 0.000          | 0.000          | Chrome  | Binary  |
| Go       | 0.000           | 0.000          | 0.000          | Firefox | Message |
| Go       | 0.000           | 0.000          | 0.000          | Firefox | Binary  |
| Node.JS  | 0.000           | 0.000          | 0.000          | Chrome  | Message |
| Node.JS  | 0.000           | 0.000          | 0.000          | Chrome  | Binary  |
| Node.JS  | 0.000           | 0.000          | 0.000          | Firefox | Message |
| Node.JS  | 0.000           | 0.000          | 0.000          | Firefox | Binary  |
| Python   | 0.000           | 0.000          | 0.000          | Chrome  | Message |
| Python   | 0.000           | 0.000          | 0.000          | Chrome  | Binary  |
| Python   | 0.000           | 0.000          | 0.000          | Firefox | Message |
| Python   | 0.000           | 0.000          | 0.000          | Firefox | Binary  |
| Bun      | 0.000           | 0.000          | 0.000          | Chrome  | Message |
| Bun      | 0.000           | 0.000          | 0.000          | Chrome  | Binary  |
| Bun      | 0.000           | 0.000          | 0.000          | Firefox | Message |
| Bun      | 0.000           | 0.000          | 0.000          | Firefox | Binary  |



## Local Testing:

#### Prerequisites:

- [Rust](https://www.rust-lang.org/tools/install)
- [Go](https://golang.org/doc/install)
- [Node.JS](https://nodejs.org/en/download/)
- [Python](https://www.python.org/downloads/)
- [Bun](https://bun.sh)

#### Running:

1. Clone this repository
```bash
git clone https://github.com/motortruck1221/ws-test.git --recursive
```
2. Install pnpm:
```bash
npm install -g pnpm
```
3. Install dependencies:
```bash
pnpm install
```
4. Setup the stuff:
```bash
pnpm run setup
```
5. Build the stuff:
```bash
pnpm run build
```
6. Run the stuff:
```bash
pnpm run test
```
7. Results will be in [./test-screenshots](./test-screenshots/)
