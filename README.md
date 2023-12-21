# A simple Websocket Test between Bun, Rust, Go, Node.JS and Python


## Results (from the last 4 runs, rounded to 3 decimal places):

### All tests were run on a clean rebooted system with no other applications running.

| Bun      | Time (ms, avg)  | Time (ms, max) | Time (ms, min) | Browser | WS Type |
|----------|-----------------|----------------|----------------|---------|---------|
|          | 0.850           | 1.200          | 0.700          | Chrome  | Message |
|          | 37.475          | 42.000         | 34.300         | Chrome  | Binary  |
|          | 2.250           | 3.000          | 1.000          | Firefox | Message |
|          | 35.750          | 39.000         | 33.000         | Firefox | Binary  |


| Go       | Time (ms, avg)  | Time (ms, max) | Time (ms, min) | Browser | WS Type |
|----------|-----------------|----------------|----------------|---------|---------|
|          | 0.750           | 0.900          | 0.600          | Chrome  | Message |
|          | 39.275          | 39.000         | 37.100         | Chrome  | Binary  |
|          | 2.000           | 3.000          | 1.000          | Firefox | Message |
|          | 36.500          | 41.000         | 33.000         | Firefox | Binary  |

| Node.JS  | Time (ms, avg)  | Time (ms, max) | Time (ms, min) | Browser | WS Type |
|----------|-----------------|----------------|----------------|---------|---------|
|          | 1.300           | 1.500          | 1.200          | Chrome  | Message |
|          | 37.175          | 40.800         | 35.300         | Chrome  | Binary  |
|          | 1.750           | 2.000          | 1.000          | Firefox | Message |
|          | 36.250          | 41.000         | 31.000         | Firefox | Binary  |

| Python   | Time (ms, avg)  | Time (ms, max) | Time (ms, min) | Browser | WS Type |
|----------|-----------------|----------------|----------------|---------|---------|
|          | 1.300           | 1.400          | 1.200          | Chrome  | Message |
|          | 63.250          | 65.500         | 61.300         | Chrome  | Binary  |
|          | 2.250           | 4.000          | 1.000          | Firefox | Message |
|          | 60.250          | 77.000         | 53.000         | Firefox | Binary  |

| Rust     | Time (ms, avg)  | Time (ms, max) | Time (ms, min) | Browser | WS Type |
|----------|-----------------|----------------|----------------|---------|---------|
|          | 0.725           | 0.600          | 0.800          | Chrome  | Message |
|          | 36.050          | 39.000         | 32.200         | Chrome  | Binary  |
|          | 2.000           | 3.000          | 1.000          | Firefox | Message |
|          | 36.000          | 39.000         | 33.000         | Firefox | Binary  |

---

# Final Rankings (based on average time):

## Rank for basic message sending (chrome):

| Rank | Language |
|------|----------|
| 1    | Rust     |
| 2    | Go       |
| 3    | Node.JS  |
| 3    | Python   |

## Rank for binary message sending (chrome):

| Rank | Language |
|------|----------|
| 1    | Rust     |
| 2    | Node.JS  |
| 3    | Bun      |
| 4    | Go       |
| 5    | Python   |

## Rank for basic message sending (firefox):

| Rank | Language |
|------|----------|
| 1    | Node.JS  |
| 2    | Rust     |
| 2 (tie w/rust) | Go    |
| 3    | Python   |
| 3 (tie w/python) | Bun |

## Rank for binary message sending (firefox):

| Rank | Language |
|------|----------|
| 1    | Bun      |
| 2    | Rust     |
| 3    | Node.JS  |
| 4    | Go       |
| 5    | Python   |


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
