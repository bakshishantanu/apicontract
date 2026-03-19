# 🔗 API Contract Testing Framework

## 📌 Overview

This project implements an **API Contract Testing Framework** as part of a DevOps internals assignment. It automatically parses an OpenAPI/Swagger specification and validates that a live API conforms to its defined contracts — covering routes, HTTP methods, response codes, and payload structure.

The framework is built entirely in **Node.js**, uses **Jest** as the test runner, and is fully integrated with a **GitHub Actions CI/CD pipeline** that runs on every push.

---

## 🧱 Tech Stack

| Tool | Purpose |
|------|---------|
| **Node.js** | Runtime environment |
| **Jest** | Test runner with built-in coverage |
| **Axios** | HTTP client for integration tests |
| **js-yaml** | Parses OpenAPI YAML spec files |
| **GitHub Actions** | CI/CD pipeline |
| **Petstore API** | Public OpenAPI target API (https://petstore3.swagger.io) |

---

## 📁 Repository Structure

```
devopsproject-apicontract/
│
├── README.md                        # Project documentation
├── .gitignore                       # Git ignore file
├── LICENSE                          # MIT License
├── package.json                     # Node dependencies & scripts
│
├── openapi/
│   └── petstore.yaml                # OpenAPI specification (Petstore v3)
│
├── src/
│   └── generator.js                 # Core framework — loads & parses spec
│
├── tests/
│   ├── unit/
│   │   └── generator.test.js        # Unit tests for generator module
│   ├── integration/
│   │   └── api.test.js              # Integration tests against live API
│   ├── selenium/
│   │   └── ui.test.js               # Selenium E2E tests (stub)
│   └── testdata/
│       └── sample.json              # Sample test data
│
└── .github/
    └── workflows/
        └── ci.yml                   # GitHub Actions CI/CD pipeline
```

---

## ⚙️ How It Works

1. **Load Spec** — `generator.js` reads `openapi/petstore.yaml` using `js-yaml`
2. **Extract Contracts** — Parses every path, HTTP method, and expected response code
3. **Run Tests** — Jest executes unit and integration test suites
4. **Report** — Coverage report generated; CI pipeline passes or fails the build

```
petstore.yaml ──▶ generator.js ──▶ Jest Test Suites ──▶ Coverage Report + CI Gate
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/devopsproject-apicontract.git
cd devopsproject-apicontract

# Install dependencies
npm install
```

---

## 🧪 Running Tests

### Unit Tests (with coverage)

```bash
npm test
```

Runs tests in `tests/unit/` and generates a coverage report.

### Integration Tests

```bash
npm run test:integration
```

Fires live HTTP requests against the public Petstore API and validates contracts.

### All Tests

```bash
npm run test:all
```

---

## 📊 Test Coverage

Coverage is tracked using Jest's built-in `--coverage` flag and uploaded as an artifact on every CI run.

| File | What's tested |
|------|--------------|
| `src/generator.js` | Spec loading, path parsing, contract extraction, method filtering |
| Integration | Status codes, response structure, content-type headers, 404 handling |

To view coverage locally, run `npm test` — a summary table appears in the terminal and a full HTML report is generated in the `coverage/` folder.

---

## 🔄 CI/CD Pipeline

The GitHub Actions pipeline (`.github/workflows/ci.yml`) runs automatically on every push and pull request to `main`.

### Pipeline Steps

```
Push to main
    │
    ├── 1. Checkout code          (actions/checkout@v4)
    ├── 2. Setup Node.js 20       (actions/setup-node@v4)
    ├── 3. Clean install          (npm ci)
    ├── 4. Run unit tests         (jest tests/unit --coverage)
    ├── 5. Run integration tests  (jest tests/integration)
    └── 6. Upload coverage report (actions/upload-artifact@v4)
```

> ✅ The build fails automatically if any test fails — enforcing contract compliance on every commit.

---

## 🧩 Test Types

### Unit Tests
Validate the internal logic of `generator.js`:
- Spec loads without errors
- Paths are correctly parsed
- Contracts are extracted with required fields
- Only valid HTTP methods are included

### Integration Tests
Validate live API contract compliance:
- `GET /pet/findByStatus` returns `200` with an array
- Response objects contain required fields (`id`, `name`, `status`)
- `GET /pet/{id}` returns `404` for non-existent resources
- `Content-Type` header matches `application/json`

### Selenium E2E (Stub)
Located in `tests/selenium/ui.test.js` — structure is in place and ready to extend with real browser tests using ChromeDriver.

---

## 📸 Screenshots

> *(Replace placeholders below with actual screenshots)*

| | |
|---|---|
| **Unit test results** | `npm test` output in terminal |
| **Integration tests** | `npm run test:integration` output |
| **GitHub Actions run** | Green pipeline in Actions tab |
| **Coverage artifact** | Artifact uploaded on CI run |

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 👤 Author

**Shantanu Bakshi**  
DevOps Class Project — API Contract Testing Framework
