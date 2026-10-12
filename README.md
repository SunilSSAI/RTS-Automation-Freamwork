# 🚀 Playwright TypeScript Page Object Model (POM) Framework
### RTS Fleet Automation (`https://staging.fleet.lmdmax.com`)

Ye Playwright aur TypeScript par based Page Object Model (POM) automation framework hai, jisme Login scenarios (Happy Path aur Negative Scenarios) properly structured hain.

---

## 📁 Project Structure (Folder Structure)

```
RTS Freamwork SSAI/
│
├── pages/                          # Page Object Model (POM) Classes
│   ├── base.page.ts                # Common utility methods (goto, waitForUrl, screenshot)
│   ├── login.page.ts               # Login page locators & methods (enterEmail, enterPassword, login)
│   └── dashboard.page.ts           # Dashboard page locators & verifications
│
├── tests/                          # Playwright Test Specs
│   └── login.spec.ts               # Login test scenarios (Valid login, Invalid password, Empty fields)
│
├── test-data/                      # Test Data JSON files
│   └── loginData.json              # Credentials & test data
│
├── .env                            # Environment Variables (URL, Credentials, Headless mode)
├── .env.example                    # Sample Environment Template
├── playwright.config.ts            # Playwright Test Configuration (Timeouts, Reporters, Viewports)
├── tsconfig.json                   # TypeScript Compiler Configuration
├── package.json                    # Scripts and dependencies
└── README.md                       # Framework documentation
```

---

## ⚙️ Prerequisites

- **Node.js** (v18 ya higher)
- **NPM** (v9 ya higher)

---

## 📥 Setup & Installation

Agar aap naye system par project download/clone kar rahe hain, to ye command chalayein:

```bash
npm install
npx playwright install chromium
```

---

## 🏃 How to Run Tests (Test Kaise Chalayein)

### 1. Headless Mode mai tests chalana (Default background mode)
```bash
npm test
```

### 2. Browser Open karke dekhna (Headed Mode)
```bash
npm run test:headed
```

### 3. Google Chrome Browser mai run karna
```bash
npm run test:chrome
```

### 4. Playwright Interactive UI Mode open karna
```bash
npm run test:ui
```

### 5. Debug Mode (Step-by-step inspector ke saath)
```bash
npm run test:debug
```

### 6. HTML Test Report dekhna
```bash
npm run report
```

---

## 🔐 Credentials Configuration (.env)

Aap `.env` file mai credentials change kar sakte hain:

```env
BASE_URL=https://staging.fleet.lmdmax.com
USER_EMAIL=mehta@gmail.com
USER_PASSWORD=Test@1234
HEADLESS=true
```

---

## 🧪 Test Scenarios Covered

### 1. Login Module (`tests/login.spec.ts`)
- **TC01: Verify Login Page Elements** - Email input, Password input, aur Sign In button visibility check.
- **TC02: Happy Path Login** - `mehta@gmail.com` aur `Test@1234` se login karke `/dashboard` redirect verify karta hai.
- **TC03: Invalid Credentials** - Wrong password daalne par access block verify karta hai.
- **TC04: Empty Fields Validation** - Blank email/password par login restrict verify karta hai.

### 2. Vehicle Module (`tests/add-vehicle.spec.ts`)
- **TC01: Navigation to Vehicles List & Add Vehicle Form** - `/vehicles` se "Add Vehicle" button click karke form kholna.
- **TC02: Form Elements Check** - Vehicle Number, VIN, Plate Number, Registered State, Save aur Cancel buttons visibility check.
- **TC03: Required Fields Validation** - Form empty hone par Save button disabled verify karna.
- **TC04: Form Data Fill & Cancel Action** - Vehicle data fill karna aur Cancel button se `/vehicles/view` wapas aana verify karna.
