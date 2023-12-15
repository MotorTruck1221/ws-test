# A simple Websocket Test between Bun, Rust, Go, Node.JS and Python


## Results:



| Language | Time (ms, avg) | Time (ms, max) | Time (ms, min) |
|----------|----------------|----------------|----------------|
| Rust     | 0.000          | 0.000          | 0.000          |
| Go       | 0.000          | 0.000          | 0.000          |
| Node.JS  | 0.000          | 0.000          | 0.000          |
| Python   | 0.000          | 0.000          | 0.000          |
| Bun      | 0.000          | 0.000          | 0.000          |


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
7. Results will be in [./test-screenshots](./test-screenshots/) and [./test-results.json](./test-results.json)
