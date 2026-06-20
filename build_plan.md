# ⚡ CalcVerse — All-in-One Calculator System
### Complete Build Plan · Phase-by-Phase · Agent-Ready

> **Stack:** HTML5 · CSS3 · Tailwind CSS v3 · Vanilla JavaScript (ES6+) · Python 3.11 (FastAPI microservice for complex engines)
> **Design Identity:** CalcVerse — a precision-first, dark-capable calculator ecosystem
> **Primary Color:** `#77d202` · **Secondary:** `#f3f5f6` (light) / `#000000` (dark)
> **Gradient Signature:** `#77d202 → #000000` (used on hero, active states, and CTAs)
> **Font Pair:** `Inter` (UI/body) + `JetBrains Mono` (number display/output)

---

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Design System](#design-system)
- [Project Architecture](#project-architecture)
- [Calculator Registry](#calculator-registry)
- [Phase 0 — Foundation & Scaffold](#phase-0--foundation--scaffold)
- [Phase 1 — Design System & Component Library](#phase-1--design-system--component-library)
- [Phase 2 — Home & Marketing Pages](#phase-2--home--marketing-pages)
- [Phase 3 — Dashboard Shell](#phase-3--dashboard-shell)
- [Phase 4 — Mathematical Calculators](#phase-4--mathematical-calculators)
- [Phase 5 — Financial Calculators](#phase-5--financial-calculators)
- [Phase 6 — Scientific & Physics Calculators](#phase-6--scientific--physics-calculators)
- [Phase 7 — Health & Fitness Calculators](#phase-7--health--fitness-calculators)
- [Phase 8 — Engineering & Tech Calculators](#phase-8--engineering--tech-calculators)
- [Phase 9 — Everyday & Utility Calculators](#phase-9--everyday--utility-calculators)
- [Phase 10 — Python Microservice (Complex Engines)](#phase-10--python-microservice-complex-engines)
- [Phase 11 — AI & Coming Soon Features](#phase-11--ai--coming-soon-features)
- [Phase 12 — Polish, Accessibility & PWA](#phase-12--polish-accessibility--pwa)
- [Phase 13 — Testing & QA](#phase-13--testing--qa)
- [Keyboard Architecture](#keyboard-architecture)
- [File Structure Reference](#file-structure-reference)

---

## Project Overview

**CalcVerse** is a browser-based, multi-category calculator platform that provides every kind of calculation a user might need — from basic arithmetic to mortgage amortization, unit conversions, physics formulas, health metrics, programming tools, date math, and more — all from a single, beautifully designed interface.

The system features:
- A **marketing homepage** with feature highlights and category previews
- A **dashboard** with sidebar navigation, search, and favorites
- **80+ individual calculators** organized across 7 categories
- A **universal keyboard system** — both on-screen keypads and full physical keyboard support
- **Light/Dark mode** with system preference detection and manual toggle
- A **"Coming Soon" AI zone** for future natural language and smart calculation features
- A **Python (FastAPI) microservice** for computationally intensive engines (amortization tables, compound growth simulators, statistical engines)

---

## Design System

### Color Tokens

```css
/* Base Brand */
--color-primary:        #77d202;   /* CalcVerse Green */
--color-primary-dark:   #5aaa00;   /* Hover/active */
--color-primary-light:  #a3e84a;   /* Subtle highlight */

/* Gradient (signature visual) */
--gradient-brand:       linear-gradient(135deg, #77d202 0%, #3a6b00 50%, #000000 100%);
--gradient-brand-h:     linear-gradient(90deg, #77d202, #000000);

/* Light Mode Surface */
--bg-base:              #f3f5f6;
--bg-surface:           #ffffff;
--bg-surface-raised:    #eef0f1;
--border-light:         #dde1e4;
--text-primary:         #0d0f10;
--text-secondary:       #4a5568;
--text-muted:           #8e9aab;

/* Dark Mode Surface */
--bg-base-dark:         #000000;
--bg-surface-dark:      #0f1010;
--bg-surface-raised-d:  #1a1c1c;
--border-dark:          #2a2e2e;
--text-primary-dark:    #f3f5f6;
--text-secondary-dark:  #a0aec0;
--text-muted-dark:      #5a6377;

/* Semantic */
--color-success:        #77d202;
--color-warning:        #f5a623;
--color-error:          #e53e3e;
--color-info:           #3182ce;
```

### Typography Scale

```css
/* Display — Hero headlines, calculator results */
font-family: 'Inter', system-ui, sans-serif;
font-family: 'JetBrains Mono', 'Courier New', monospace; /* numbers only */

--text-xs:    0.75rem;    /* 12px — labels */
--text-sm:    0.875rem;   /* 14px — secondary */
--text-base:  1rem;       /* 16px — body */
--text-lg:    1.125rem;   /* 18px — card titles */
--text-xl:    1.25rem;    /* 20px — section heads */
--text-2xl:   1.5rem;     /* 24px — page titles */
--text-3xl:   1.875rem;   /* 30px — hero subhead */
--text-4xl:   2.25rem;    /* 36px — hero head */
--text-display: 3.5rem;   /* 56px — calculator result */
--text-jumbo:   5rem;     /* 80px — hero number showcase */
```

### Spacing & Radius

```css
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-xl:   16px;
--radius-2xl:  24px;
--radius-full: 9999px;

--shadow-sm:   0 1px 3px rgba(0,0,0,0.08);
--shadow-md:   0 4px 16px rgba(0,0,0,0.12);
--shadow-lg:   0 8px 32px rgba(0,0,0,0.18);
--shadow-glow: 0 0 20px rgba(119,210,2,0.25); /* brand glow */
```

### Component Design Language

- **Cards:** Rounded (`radius-xl`), subtle border, hover lifts with `shadow-md` + `translateY(-2px)`
- **Buttons (Primary):** Gradient `#77d202 → #000000`, white text, pill shape, glow on hover
- **Buttons (Secondary):** Outlined with `#77d202` border, transparent fill
- **Inputs:** Rounded, focus ring in `#77d202`, smooth transitions
- **Calculator Display:** `JetBrains Mono`, large (`text-display`), right-aligned, dark panel
- **Keypad Buttons:** Grid layout, glass morphism in dark mode, tactile press animation (`scale(0.95)`)
- **Sidebar:** Fixed left, collapsible, icon + label nav, active item has gradient left border
- **Dark Mode Toggle:** Floating pill in top-right with sun/moon icon swap

---

## Project Architecture

```
calcverse/
├── index.html                    # Marketing homepage
├── about.html                    # About page
├── privacy.html                  # Privacy policy
├── 404.html                      # Custom 404
│
├── app/
│   ├── dashboard.html            # Main dashboard (calculator hub)
│   │
│   ├── math/
│   │   ├── basic.html
│   │   ├── scientific.html
│   │   ├── algebra.html
│   │   ├── percentage.html
│   │   ├── fraction.html
│   │   ├── prime.html
│   │   ├── matrix.html
│   │   ├── statistics.html
│   │   ├── graphing.html
│   │   └── number-base.html
│   │
│   ├── finance/
│   │   ├── loan.html
│   │   ├── mortgage.html
│   │   ├── compound-interest.html
│   │   ├── simple-interest.html
│   │   ├── roi.html
│   │   ├── npv.html
│   │   ├── irr.html
│   │   ├── salary.html
│   │   ├── tax.html
│   │   ├── vat.html
│   │   ├── currency.html
│   │   ├── savings-goal.html
│   │   ├── retirement.html
│   │   ├── break-even.html
│   │   ├── profit-margin.html
│   │   └── crypto.html
│   │
│   ├── health/
│   │   ├── bmi.html
│   │   ├── bmr.html
│   │   ├── tdee.html
│   │   ├── body-fat.html
│   │   ├── ideal-weight.html
│   │   ├── calorie.html
│   │   ├── water-intake.html
│   │   ├── pregnancy.html
│   │   ├── ovulation.html
│   │   └── heart-rate.html
│   │
│   ├── science/
│   │   ├── physics.html
│   │   ├── chemistry.html
│   │   ├── ohm-law.html
│   │   ├── force.html
│   │   ├── pressure.html
│   │   ├── energy.html
│   │   ├── wavelength.html
│   │   └── periodic.html
│   │
│   ├── engineering/
│   │   ├── unit-converter.html
│   │   ├── resistor.html
│   │   ├── voltage-divider.html
│   │   ├── binary.html
│   │   ├── hex.html
│   │   ├── ip-subnet.html
│   │   ├── data-storage.html
│   │   └── bandwidth.html
│   │
│   ├── everyday/
│   │   ├── age.html
│   │   ├── date-diff.html
│   │   ├── time-zone.html
│   │   ├── tip.html
│   │   ├── discount.html
│   │   ├── fuel.html
│   │   ├── speed-distance.html
│   │   ├── cooking.html
│   │   ├── grade.html
│   │   └── random-number.html
│   │
│   └── coming-soon/
│       ├── ai-math.html
│       └── smart-budget.html
│
├── assets/
│   ├── css/
│   │   ├── main.css              # Tailwind base + custom tokens
│   │   ├── calculator.css        # Shared calculator layout styles
│   │   ├── keypad.css            # All keypad variants
│   │   └── themes.css            # Dark/light mode overrides
│   │
│   ├── js/
│   │   ├── core/
│   │   │   ├── theme.js          # Dark/light mode engine
│   │   │   ├── router.js         # SPA-lite navigation
│   │   │   ├── storage.js        # localStorage: favorites, history
│   │   │   ├── keyboard.js       # Physical keyboard bindings
│   │   │   └── search.js         # Calculator search/filter
│   │   │
│   │   ├── components/
│   │   │   ├── sidebar.js        # Sidebar nav component
│   │   │   ├── keypad.js         # On-screen keypad engine
│   │   │   ├── display.js        # Calculator display component
│   │   │   ├── history.js        # Calculation history panel
│   │   │   ├── toast.js          # Notification toasts
│   │   │   └── modal.js          # Modal system
│   │   │
│   │   ├── engines/
│   │   │   ├── math-engine.js    # Expression parser/evaluator
│   │   │   ├── finance-engine.js # Financial formulas
│   │   │   ├── health-engine.js  # Health metric formulas
│   │   │   ├── unit-engine.js    # Unit conversion tables
│   │   │   └── date-engine.js    # Date/time calculations
│   │   │
│   │   └── calculators/          # One JS file per calculator
│   │       ├── basic.js
│   │       ├── scientific.js
│   │       ├── mortgage.js
│   │       └── ...
│   │
│   ├── fonts/
│   │   ├── Inter-Variable.woff2
│   │   └── JetBrainsMono-Variable.woff2
│   │
│   └── icons/
│       └── calcverse-icons.svg   # SVG sprite
│
├── api/                          # Python FastAPI microservice
│   ├── main.py
│   ├── requirements.txt
│   ├── routers/
│   │   ├── amortization.py
│   │   ├── statistics.py
│   │   ├── matrix.py
│   │   ├── graphing.py
│   │   └── retirement.py
│   └── utils/
│       ├── validators.py
│       └── formatters.py
│
├── tailwind.config.js
├── package.json
└── README.md
```

---

## Calculator Registry

### Category 1 — Mathematics (10 calculators)

| ID | Name | Complexity | Engine |
|----|------|-----------|--------|
| `math-basic` | Basic / Standard Calculator | Low | JS |
| `math-scientific` | Scientific Calculator | Medium | JS |
| `math-algebra` | Algebra Solver (linear, quadratic) | Medium | JS |
| `math-percentage` | Percentage Calculator | Low | JS |
| `math-fraction` | Fraction Calculator | Low | JS |
| `math-prime` | Prime Number Checker & Generator | Medium | JS |
| `math-matrix` | Matrix Calculator (2x2, 3x3) | High | Python |
| `math-statistics` | Statistics Calculator (mean, median, SD…) | High | Python |
| `math-graphing` | Function Grapher (Canvas) | High | JS + Python |
| `math-base` | Number Base Converter (bin/oct/dec/hex) | Low | JS |

### Category 2 — Finance (16 calculators)

| ID | Name | Complexity | Engine |
|----|------|-----------|--------|
| `fin-loan` | Loan / EMI Calculator | Medium | JS |
| `fin-mortgage` | Mortgage + Amortization Table | High | Python |
| `fin-compound` | Compound Interest + Growth Chart | Medium | JS |
| `fin-simple` | Simple Interest | Low | JS |
| `fin-roi` | ROI Calculator | Low | JS |
| `fin-npv` | NPV & DCF Calculator | High | Python |
| `fin-irr` | IRR Calculator | High | Python |
| `fin-salary` | Salary / Paycheck Calculator | Medium | JS |
| `fin-tax` | Income Tax Estimator | Medium | JS |
| `fin-vat` | VAT / GST Calculator | Low | JS |
| `fin-currency` | Currency Converter (live rates via API) | Medium | JS |
| `fin-savings` | Savings Goal Planner | Medium | JS |
| `fin-retirement` | Retirement Savings Estimator | High | Python |
| `fin-breakeven` | Break-Even Analysis | Medium | JS |
| `fin-margin` | Profit Margin / Markup Calculator | Low | JS |
| `fin-crypto` | Crypto Profit/Loss Calculator | Medium | JS |

### Category 3 — Health & Fitness (10 calculators)

| ID | Name | Complexity | Engine |
|----|------|-----------|--------|
| `health-bmi` | BMI Calculator | Low | JS |
| `health-bmr` | BMR (Basal Metabolic Rate) | Low | JS |
| `health-tdee` | TDEE (Total Daily Energy Expenditure) | Low | JS |
| `health-bodyfat` | Body Fat Percentage | Medium | JS |
| `health-idealwt` | Ideal Body Weight | Low | JS |
| `health-calorie` | Calorie Burn Estimator | Medium | JS |
| `health-water` | Daily Water Intake | Low | JS |
| `health-pregnancy` | Pregnancy Due Date Calculator | Low | JS |
| `health-ovulation` | Ovulation & Fertility Window | Medium | JS |
| `health-heartrate` | Target Heart Rate Zones | Low | JS |

### Category 4 — Science & Physics (8 calculators)

| ID | Name | Complexity | Engine |
|----|------|-----------|--------|
| `sci-physics` | Physics Formula Calculator (kinematics, etc.) | Medium | JS |
| `sci-chemistry` | Chemistry: Molar Mass, Molarity | Medium | JS |
| `sci-ohm` | Ohm's Law Calculator | Low | JS |
| `sci-force` | Force / Newton's Second Law | Low | JS |
| `sci-pressure` | Pressure, Volume, Temperature (Gas Laws) | Medium | JS |
| `sci-energy` | Energy, Power, Work Calculator | Low | JS |
| `sci-wavelength` | Wavelength / Frequency / Speed of Light | Low | JS |
| `sci-periodic` | Periodic Table Element Lookup | Medium | JS |

### Category 5 — Engineering & Tech (8 calculators)

| ID | Name | Complexity | Engine |
|----|------|-----------|--------|
| `eng-unit` | Universal Unit Converter (length, mass, temp…) | Medium | JS |
| `eng-resistor` | Resistor Color Code Calculator | Low | JS |
| `eng-voltage` | Voltage Divider Calculator | Low | JS |
| `eng-binary` | Binary / Bitwise Calculator | Medium | JS |
| `eng-hex` | Hex Color to RGB/HSL Converter | Low | JS |
| `eng-subnet` | IP Subnet / CIDR Calculator | High | JS |
| `eng-datastorage` | Data Storage Unit Converter | Low | JS |
| `eng-bandwidth` | Network Bandwidth / Transfer Time | Low | JS |

### Category 6 — Everyday Utilities (10 calculators)

| ID | Name | Complexity | Engine |
|----|------|-----------|--------|
| `day-age` | Age Calculator | Low | JS |
| `day-datediff` | Date Difference Calculator | Low | JS |
| `day-timezone` | Time Zone Converter | Medium | JS |
| `day-tip` | Tip & Bill Splitter | Low | JS |
| `day-discount` | Discount & Sale Price | Low | JS |
| `day-fuel` | Fuel Cost / MPG Calculator | Low | JS |
| `day-speed` | Speed / Distance / Time | Low | JS |
| `day-cooking` | Cooking Unit Converter & Recipe Scaler | Low | JS |
| `day-grade` | Grade / GPA Calculator | Low | JS |
| `day-random` | Random Number / Password Generator | Low | JS |

### Category 7 — Coming Soon (AI & Advanced) (2 preview)

| ID | Name | Status |
|----|------|--------|
| `ai-math` | AI Natural Language Math Solver | Coming Soon |
| `ai-budget` | Smart Budget Planner (AI) | Coming Soon |

**Total: 64 calculators (62 live + 2 coming soon)**

---

## Phase 0 — Foundation & Scaffold

**Goal:** Set up the project skeleton, tooling, and configuration before writing any UI.

### Phase 0.1 — Project Initialization

```bash
mkdir calcverse && cd calcverse
npm init -y
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**tailwind.config.js:**

```js
module.exports = {
  darkMode: 'class',
  content: ['./**/*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#77d202',
          dark: '#5aaa00',
          light: '#a3e84a',
        },
        surface: {
          light: '#f3f5f6',
          dark: '#0f1010',
        },
        'raised-dark': '#1a1c1c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #77d202 0%, #3a6b00 50%, #000000 100%)',
        'brand-gradient-h': 'linear-gradient(90deg, #77d202, #000000)',
        'brand-gradient-v': 'linear-gradient(180deg, #77d202, #000000)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(119, 210, 2, 0.25)',
        'glow-lg': '0 0 40px rgba(119, 210, 2, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'key-press': 'keyPress 0.1s ease-in-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
    },
  },
  plugins: [],
}
```

### Phase 0.2 — Directory Structure Creation

Create every directory and placeholder file as defined in the architecture tree above. Create empty JS files for all engines and components. Create all HTML shell files with doctype only.

### Phase 0.3 — Base HTML Template

Create `_base.html` template that all pages extend with:

- `<head>` with meta tags, canonical, OG tags, font preloads
- Tailwind CDN link (development) / compiled CSS link (production)
- Body with `data-theme` attribute
- Theme initialization script (inline, before body to prevent FOUC)
- Footer with nav links

**Anti-FOUC Script (must be in `<head>`, synchronous):**

```html
<script>
  (function() {
    const theme = localStorage.getItem('cv-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  })();
</script>
```

### Phase 0.4 — Python Microservice Scaffold

```
api/
├── main.py           # FastAPI app, CORS, routes
├── requirements.txt  # fastapi, uvicorn, numpy, scipy, sympy
└── routers/          # One router per complex domain
```

```python
# requirements.txt
fastapi==0.111.0
uvicorn==0.30.0
numpy==1.26.4
scipy==1.13.0
sympy==1.12
pydantic==2.7.0
```

```python
# main.py skeleton
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import amortization, statistics, matrix, retirement

app = FastAPI(title="CalcVerse API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

app.include_router(amortization.router, prefix="/api/amortization")
app.include_router(statistics.router, prefix="/api/statistics")
app.include_router(matrix.router, prefix="/api/matrix")
app.include_router(retirement.router, prefix="/api/retirement")
```

---

## Phase 1 — Design System & Component Library

**Goal:** Build all reusable HTML/CSS/JS components once. Every calculator page will compose from these.

### Phase 1.1 — CSS Custom Properties & Tailwind Extensions

Create `assets/css/main.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: #77d202;
    --color-primary-dark: #5aaa00;
    --color-primary-light: #a3e84a;
    --gradient-brand: linear-gradient(135deg, #77d202 0%, #3a6b00 50%, #000000 100%);
    /* ... all tokens from Design System section */
  }

  html.dark {
    --bg-base: #000000;
    --bg-surface: #0f1010;
    /* ... dark token overrides */
  }

  * { box-sizing: border-box; }
  
  body {
    @apply bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-gray-100;
    @apply font-sans antialiased transition-colors duration-300;
  }

  :focus-visible {
    @apply outline-none ring-2 ring-primary ring-offset-2;
  }
}

@layer components {
  /* All reusable component classes here */
}
```

Create `assets/css/keypad.css` — all keypad grid layouts, button variants, press animations.

Create `assets/css/calculator.css` — display panel, input row, result area shared layout.

### Phase 1.2 — Sidebar Navigation Component

**File:** `assets/js/components/sidebar.js`

The sidebar is the core navigation for the dashboard. Implement as a self-contained class:

```js
class CalcVerseSidebar {
  constructor(containerEl) { ... }
  
  // Methods:
  render()          // Injects HTML into container
  setActive(id)     // Highlights active calc
  collapse()        // Icon-only mode (desktop ≤1280px)
  expand()          // Full label mode
  toggle()          // Mobile slide-in/out
  search(query)     // Filter nav items
}
```

**Sidebar HTML Structure:**

```
┌─────────────────────┐
│  ⚡ CalcVerse  [≡]  │  ← Logo + collapse toggle
├─────────────────────┤
│  🔍 Search calcs…   │  ← Inline search
├─────────────────────┤
│  ★ Favorites        │  ← Collapsible section
│    • Basic Calc     │
├─────────────────────┤
│  ∑ Mathematics   ∨  │  ← Category (collapsible)
│    • Basic          │
│    • Scientific     │
│    • Statistics     │
│    …               │
├─────────────────────┤
│  $ Finance       ∨  │
│    …               │
├─────────────────────┤
│  ♥ Health        ∨  │
│    …               │
├─────────────────────┤
│  ⚗ Science       ∨  │
│    …               │
├─────────────────────┤
│  ⚙ Engineering   ∨  │
│    …               │
├─────────────────────┤
│  📅 Everyday     ∨  │
│    …               │
├─────────────────────┤
│  ✨ AI (Soon)       │  ← Gradient badge
└─────────────────────┘
```

**Design details:**
- Fixed left, `w-64` expanded / `w-16` collapsed
- Active item: left border 3px solid `#77d202`, background `rgba(119,210,2,0.08)`
- Category headers: uppercase, letter-spaced, `text-xs text-muted`
- Hover: smooth background transition
- Mobile: slide-over drawer with backdrop blur

### Phase 1.3 — Calculator Display Component

**File:** `assets/js/components/display.js`

The universal display panel used by all calculators:

```
┌─────────────────────────────────────────────┐
│  expression: (2 + 3) × 4                   │  ← Small, muted top
│                                             │
│                              20             │  ← Large, JetBrains Mono
│                                             │
│  [History ↑]  [Copy]  [Formula ↓]  [Share] │  ← Action row
└─────────────────────────────────────────────┘
```

Features:
- Overflow scroll on expression (no wrapping — user can scroll left)
- Result animates in (count-up for numbers under 1M)
- Error state: display turns red with shake animation
- Copy button: copies result to clipboard + toast confirmation
- History toggle: shows last 10 calculations in a sliding panel

### Phase 1.4 — Keypad Engine

**File:** `assets/js/components/keypad.js`

The keypad system supports 5 layouts, selectable per calculator:

**Layout A — Standard (4×5 grid):**
```
 [C]  [±]  [%]  [÷]
 [7]  [8]  [9]  [×]
 [4]  [5]  [6]  [−]
 [1]  [2]  [3]  [+]
 [0]     [.]  [=]
```

**Layout B — Scientific Extension (adds above standard):**
```
 [sin] [cos] [tan] [log] [ln]
 [x²]  [x³]  [√]  [∛]  [π]
 [e]   [(]   [)]  [!]  [EXP]
 ... (then standard grid below)
```

**Layout C — Financial (specialized labels):**
```
 [PV]  [FV]  [N]  [I/Y]
 [PMT] [C]   [%]  [÷]
 [7]   [8]   [9]  [×]
 ...
```

**Layout D — Date/Time Picker (no numeric grid, date inputs only)**

**Layout E — Unit Converter (dropdown + number pad)**

**Keypad Class:**

```js
class CalcVerseKeypad {
  constructor(config) {
    this.layout = config.layout;   // 'standard' | 'scientific' | 'financial' | 'date' | 'unit'
    this.target = config.target;   // display component to write to
    this.onKey = config.onKey;     // callback(key)
  }
  
  render(container)     // Mount keypad HTML
  press(key)            // Trigger key (from click or keyboard)
  highlight(key)        // Visual feedback on physical key press
  setLayout(layout)     // Switch layout dynamically
  disable(keys)         // Gray out unavailable keys
  enable(keys)          // Re-enable keys
}
```

**Keypad Button Design:**

```css
/* Standard key */
.calc-key {
  @apply bg-white dark:bg-raised-dark;
  @apply border border-gray-200 dark:border-gray-700;
  @apply rounded-xl font-mono text-lg font-medium;
  @apply transition-all duration-75 active:scale-95;
  @apply hover:bg-gray-50 dark:hover:bg-gray-800;
  @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-primary;
  @apply h-14 w-full cursor-pointer select-none;
}

/* Operator key */
.calc-key-op {
  @apply bg-primary/10 text-primary font-semibold;
  @apply hover:bg-primary/20;
}

/* Equals key */
.calc-key-equals {
  @apply bg-brand-gradient text-white font-bold;
  @apply shadow-glow hover:shadow-glow-lg;
}

/* Clear key */
.calc-key-clear {
  @apply bg-red-500/10 text-red-500;
  @apply hover:bg-red-500/20;
}

/* Function key (scientific) */
.calc-key-fn {
  @apply bg-gray-100 dark:bg-gray-800 text-sm;
  @apply text-gray-600 dark:text-gray-400;
}
```

### Phase 1.5 — Physical Keyboard Bindings

**File:** `assets/js/core/keyboard.js`

```js
class KeyboardBridge {
  constructor(keypad) { this.keypad = keypad; }
  
  bind() {
    document.addEventListener('keydown', (e) => {
      // Prevent default for calc keys when calc is focused
      const map = {
        '0'-'9': () => this.keypad.press(e.key),
        '.':     () => this.keypad.press('.'),
        '+':     () => this.keypad.press('+'),
        '-':     () => this.keypad.press('−'),
        '*':     () => this.keypad.press('×'),
        '/':     () => { e.preventDefault(); this.keypad.press('÷'); },
        'Enter': () => this.keypad.press('='),
        'Backspace': () => this.keypad.press('⌫'),
        'Escape':    () => this.keypad.press('C'),
        'F9':        () => this.keypad.press('±'),
        '%':         () => this.keypad.press('%'),
        's':         () => this.keypad.press('sin'),   // Scientific mode
        'c':         () => this.keypad.press('cos'),
        't':         () => this.keypad.press('tan'),
        'l':         () => this.keypad.press('log'),
        'q':         () => this.keypad.press('√'),
        'p':         () => this.keypad.press('π'),
      };
      
      if (map[e.key]) {
        this.keypad.highlight(e.key); // Visual flash on screen key
        map[e.key]();
      }
    });
  }
  
  // Show keyboard shortcut overlay (press ?)
  showShortcutHelp() { ... }
}
```

### Phase 1.6 — Theme Engine

**File:** `assets/js/core/theme.js`

```js
class ThemeEngine {
  constructor() {
    this.current = localStorage.getItem('cv-theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  
  toggle() {
    this.current = this.current === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', this.current === 'dark');
    localStorage.setItem('cv-theme', this.current);
    this._dispatchChange();
  }
  
  set(theme) { ... }
  get() { return this.current; }
  
  _dispatchChange() {
    document.dispatchEvent(new CustomEvent('cv:theme-change', { detail: this.current }));
  }
}
```

**Theme Toggle Button HTML:**
```html
<button id="theme-toggle" class="
  fixed top-4 right-4 z-50
  flex items-center gap-2 px-4 py-2
  bg-white dark:bg-raised-dark
  border border-gray-200 dark:border-gray-700
  rounded-full shadow-md
  text-sm font-medium
  transition-all duration-200
  hover:shadow-lg hover:border-primary
">
  <span class="dark:hidden">🌙 Dark</span>
  <span class="hidden dark:inline">☀️ Light</span>
</button>
```

### Phase 1.7 — History & Favorites System

**File:** `assets/js/core/storage.js`

```js
const CalcStorage = {
  // History: per-calculator, last 50 entries
  addHistory(calcId, { expression, result, timestamp }) { ... },
  getHistory(calcId) { ... },
  clearHistory(calcId) { ... },
  
  // Favorites: list of calculator IDs
  addFavorite(calcId) { ... },
  removeFavorite(calcId) { ... },
  getFavorites() { ... },
  isFavorite(calcId) { ... },
  
  // Last used: track 10 recent calculators
  recordVisit(calcId) { ... },
  getRecent() { ... },
};
```

**History Panel Design:**
```
┌─────── History ──────────── [Clear] ┐
│ 10/06 14:32  (2+3)×4 = 20          │
│ 10/06 14:31  √144 = 12             │
│ 10/06 14:30  15% of 200 = 30       │
│ 10/06 14:29  100 ÷ 4 = 25          │
└─────────────────────────────────────┘
```

### Phase 1.8 — Toast & Modal System

**File:** `assets/js/components/toast.js`

```js
// Usage throughout app:
Toast.show('Copied to clipboard!', 'success');  // green
Toast.show('Invalid expression', 'error');       // red
Toast.show('Saved to favorites', 'info');        // blue
```

**Toast Design:** Slide in from bottom-right, auto-dismiss after 3s, `#77d202` left border on success.

**File:** `assets/js/components/modal.js`

Used for: formula explanation, share options, keyboard shortcuts reference, unit info.

---

## Phase 2 — Home & Marketing Pages

**Goal:** Build the public-facing marketing site. This is the first impression — it must be world-class.

### Phase 2.1 — Homepage (`index.html`)

**Page Sections:**

#### Section 1: Hero

```
┌──────────────────────────────────────────────────────────────────┐
│  ⚡ CalcVerse          [Dark mode]    [Open Calculator →]        │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Every calculation                                              │
│   you'll ever need.         ┌──────────────────┐                │
│                             │  2 + 2 = 4       │                │
│   64 calculators across     │  ┌────────────┐  │                │
│   7 categories.             │  │   4        │  │                │
│   Built for speed,          │  └────────────┘  │                │
│   clarity, and precision.   │  [7][8][9][÷]   │                │
│                             │  [4][5][6][×]   │                │
│   [Open Dashboard →]        │  [1][2][3][−]   │                │
│   [Browse Calculators]      │  [0]  [.] [+]   │                │
│                             └──────────────────┘                │
└──────────────────────────────────────────────────────────────────┘
```

**Hero design specs:**
- Left: headline with gradient text on "every calculation" (`#77d202 → #3a6b00`)
- Right: a live, functional mini basic calculator widget embedded in the hero
- Background: very subtle dot grid pattern in light mode; near-black in dark mode
- Below hero: scrolling ticker of calculator names: `BMI · Mortgage · Matrix · Compound Interest · Ohm's Law · …`

#### Section 2: Category Showcase

6 category cards in a responsive 3×2 grid:

```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ ∑ MATH   │ │ $ FINANCE│ │ ♥ HEALTH │
│          │ │          │ │          │
│ 10 tools │ │ 16 tools │ │ 10 tools │
│ →        │ │ →        │ │ →        │
└──────────┘ └──────────┘ └──────────┘
┌──────────┐ ┌──────────┐ ┌──────────┐
│ ⚗ SCIENCE│ │ ⚙ ENG    │ │📅 EVERYDAY│
│          │ │          │ │          │
│  8 tools │ │  8 tools │ │ 10 tools │
│ →        │ │ →        │ │ →        │
└──────────┘ └──────────┘ └──────────┘
```

**Card design:** Gradient left border on hover, icon in `#77d202`, dark/light adaptive.

#### Section 3: Feature Highlights (3 columns)

- ⌨️ **Keyboard-First** — Every key on your keyboard works instantly
- 🌙 **Dark Mode Ready** — Perfect for late-night number crunching
- 📋 **Calculation History** — Never lose a previous result
- ⭐ **Favorites** — Pin your most-used calculators
- 📱 **Works Everywhere** — Responsive on any screen
- ✨ **AI Coming Soon** — Natural language calculations on the horizon

#### Section 4: Popular Calculators Preview

Horizontal scroll row of 8 "most used" calculator cards with live interactive preview.

#### Section 5: AI Teaser (Coming Soon)

```
┌─────────────────────────────────────────────────────────────────┐
│  ✨ AI-Powered Calculations — Coming Soon                        │
│                                                                  │
│  "What's 15% tip on a $127 dinner split between 4 people?"      │
│   ↳ Each person owes $36.51 (tip included)                      │
│                                                                  │
│  Just type in plain English. CalcVerse AI does the rest.        │
│                               [Join Waitlist]                   │
└─────────────────────────────────────────────────────────────────┘
```

**Design:** Dark card with `#77d202 → #000000` gradient border, animated cursor blinking in the demo prompt.

#### Section 6: Footer

```
⚡ CalcVerse

Math · Finance · Health · Science · Engineering · Everyday · AI Soon

[Privacy]  [About]  [GitHub]  [Contact]

© 2025 CalcVerse. Built for humans who calculate.
```

### Phase 2.2 — About Page (`about.html`)

- Mission statement
- Technology stack overview
- Calculator count stats (animated count-up on scroll)
- Open source / contribution info
- Contact form (front-end only)

### Phase 2.3 — 404 Page (`404.html`)

```
   4   ⚡   4

Calculation not found.

[Back to Dashboard]  [Browse All Calculators]
```

---

## Phase 3 — Dashboard Shell

**Goal:** Build the primary application shell that wraps all calculator pages.

### Phase 3.1 — Dashboard Layout (`app/dashboard.html`)

```
┌──────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (fixed)    │  TOP BAR                                        │
│                    ├──────────────────────────────────────────────────│
│ ⚡ CalcVerse       │  🔍 Search calculators…        [?] [☀/🌙] [⭐] │
│ ─────────────────  ├──────────────────────────────────────────────────│
│ ★ Favorites        │                                                  │
│   Basic Calc       │  CONTENT AREA                                    │
│   Mortgage         │                                                  │
│                    │  (Dashboard home or active calculator renders)   │
│ ∑ Mathematics      │                                                  │
│   Basic            │                                                  │
│   Scientific       │                                                  │
│   Algebra          │                                                  │
│   …                │                                                  │
│                    │                                                  │
│ $ Finance          │                                                  │
│   Loan             │                                                  │
│   Mortgage         │                                                  │
│   …                │                                                  │
│                    │                                                  │
│ ♥ Health           │                                                  │
│ ⚗ Science          │                                                  │
│ ⚙ Engineering      │                                                  │
│ 📅 Everyday        │                                                  │
│ ✨ AI (Soon)       │                                                  │
│                    │                                                  │
└──────────────────────────────────────────────────────────────────────┘
```

### Phase 3.2 — Dashboard Home (default view)

When no calculator is selected, show the dashboard home:

**Top row: Quick Stats**
```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│    64    │  │    7     │  │    5     │  │  ⭐ 3    │
│ Calcs    │  │ Categories│  │ Recent   │  │ Favorites │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

**Recent calculators row:**
Horizontally scrollable row of last-used calculator cards.

**Featured calculator of the day:**
Highlighted single large card with direct link + description.

**Category grid:**
All 7 categories with calculator count and quick-access links.

### Phase 3.3 — Search System

**File:** `assets/js/core/search.js`

Real-time calculator search with:
- Fuzzy matching on name, category, and tags
- Keyboard shortcut: `/` to focus search anywhere in dashboard
- Results dropdown with category grouping
- `Enter` navigates to top result

```
┌─────────────────────────────────────────┐
│ 🔍 mortgage                             │
├─────────────────────────────────────────┤
│ FINANCE                                 │
│   💰 Mortgage Calculator          →    │
│   📊 Amortization Table           →    │
├─────────────────────────────────────────┤
│ EVERYDAY                                │
│   📅 Loan Repayment Date          →    │
└─────────────────────────────────────────┘
```

### Phase 3.4 — Standard Calculator Page Layout

Every calculator page follows this shell:

```html
<!-- app/[category]/[name].html -->
<div class="calc-page">

  <!-- Breadcrumb -->
  <nav class="breadcrumb">
    Dashboard / Finance / Mortgage Calculator
  </nav>

  <!-- Page Header -->
  <div class="calc-header">
    <div>
      <span class="calc-category-badge">Finance</span>
      <h1 class="calc-title">Mortgage Calculator</h1>
      <p class="calc-description">Calculate monthly payments, total cost, and see your full amortization schedule.</p>
    </div>
    <div class="calc-actions">
      <button class="btn-favorite" data-calc-id="fin-mortgage">☆ Favorite</button>
      <button class="btn-share">Share</button>
      <button class="btn-formula">Formula ƒ</button>
    </div>
  </div>

  <!-- Calculator Body (varies by type) -->
  <div class="calc-body">
    <!-- Display + Keypad OR Form-based input -->
  </div>

  <!-- Formula Reference (collapsible) -->
  <details class="calc-formula-box">
    <summary>How it's calculated</summary>
    <div class="formula-content">...</div>
  </details>

  <!-- Related Calculators -->
  <div class="related-calcs">
    <h3>Related Calculators</h3>
    <!-- 3 related calc cards -->
  </div>

</div>
```

---

## Phase 4 — Mathematical Calculators

### Phase 4.1 — Basic Calculator

**File:** `app/math/basic.html` + `assets/js/calculators/basic.js`

The flagship calculator. Implement as a fully-functional standard calculator.

**Layout (two-column on desktop, single-column on mobile):**

```
┌──────────────────────────────────────────────────┐
│  DISPLAY PANEL                                    │
│  ┌─────────────────────────────────────────────┐ │
│  │  expression: (45 + 12) × 3                 │ │
│  │                                    171      │ │
│  └─────────────────────────────────────────────┘ │
│                                                   │
│  KEYPAD                                           │
│  ┌────┐ ┌────┐ ┌────┐ ┌──────┐                  │
│  │ C  │ │ ±  │ │ %  │ │  ÷   │                  │
│  └────┘ └────┘ └────┘ └──────┘                  │
│  ┌────┐ ┌────┐ ┌────┐ ┌──────┐                  │
│  │ 7  │ │ 8  │ │ 9  │ │  ×   │                  │
│  └────┘ └────┘ └────┘ └──────┘                  │
│  ┌────┐ ┌────┐ ┌────┐ ┌──────┐                  │
│  │ 4  │ │ 5  │ │ 6  │ │  −   │                  │
│  └────┘ └────┘ └────┘ └──────┘                  │
│  ┌────┐ ┌────┐ ┌────┐ ┌──────┐                  │
│  │ 1  │ │ 2  │ │ 3  │ │  +   │                  │
│  └────┘ └────┘ └────┘ └──────┘                  │
│  ┌──────────┐  ┌────┐ ┌──────┐                  │
│  │    0     │  │ .  │ │  =   │                  │
│  └──────────┘  └────┘ └──────┘                  │
│                                                   │
│  HISTORY PANEL (collapsible)                      │
└──────────────────────────────────────────────────┘
```

**JS Implementation notes:**
- Use a proper expression evaluator — NOT `eval()`. Implement a shunting-yard algorithm parser.
- Handle edge cases: division by zero, overflow, consecutive operators
- Maintain `expression[]` array, not just running total
- Support chained calculations

### Phase 4.2 — Scientific Calculator

**File:** `app/math/scientific.html` + `assets/js/calculators/scientific.js`

Extend basic calculator with:
- Second function toggle (`2nd` key flips sin↔sin⁻¹, etc.)
- Memory: M+, M−, MR, MC
- Degree/Radian toggle
- Constants: π, e, φ (golden ratio)

**Additional keys:**
```
[2nd] [sin][cos][tan][log][ln]
[x²] [x³] [xʸ] [√] [∛] [ʸ√x]
[e]  [π]  [φ] [(] [)]  [!]
[EE] [Ans] [RND] [M+] [MR]
```

### Phase 4.3 — Algebra Solver

**File:** `app/math/algebra.html`

**Input form approach** (not keypad):
- Linear equation: `ax + b = c` → solve for `x`
- Quadratic: `ax² + bx + c = 0` → show both roots, discriminant
- Display: shows step-by-step working below result

### Phase 4.4 — Percentage Calculator

**File:** `app/math/percentage.html`

Multi-mode percentage calculator:
- Mode 1: What is X% of Y?
- Mode 2: X is what % of Y?
- Mode 3: Percentage change from X to Y
- Mode 4: X increased/decreased by Y%

**Layout:** Tab switcher for 4 modes, simple form inputs, instant result.

### Phase 4.5 — Fraction Calculator

**File:** `app/math/fraction.html`

- Input: fraction components (numerator/denominator)
- Operations: +, −, ×, ÷ between two fractions
- Output: result as fraction + decimal + simplified form

### Phase 4.6 — Prime Number Calculator

**File:** `app/math/prime.html`

- Check if number is prime
- Find next prime after N
- Generate primes up to N (Sieve of Eratosthenes — JS)
- Prime factorization with factor tree display

### Phase 4.7 — Matrix Calculator

**File:** `app/math/matrix.html`
**API:** `POST /api/matrix/calculate`

- 2×2 and 3×3 matrices
- Operations: Add, Subtract, Multiply, Transpose, Determinant, Inverse
- Visual matrix input grid with tab-navigation
- Python backend for numerical precision

### Phase 4.8 — Statistics Calculator

**File:** `app/math/statistics.html`
**API:** `POST /api/statistics/calculate`

Input: comma-separated data set

Outputs:
- Count, Sum, Mean, Median, Mode
- Variance, Standard Deviation (population + sample)
- Min, Max, Range
- Quartiles (Q1, Q2, Q3), IQR
- Histogram visualization (canvas)
- Box plot visualization (canvas)

### Phase 4.9 — Function Grapher

**File:** `app/math/graphing.html`

- Input: function expression e.g. `f(x) = x² + 2x - 3`
- Canvas-based graph renderer
- Pan + zoom controls
- Multiple functions (up to 4, different colors)
- Grid lines, axis labels, intercept markers

### Phase 4.10 — Number Base Converter

**File:** `app/math/number-base.html`

- Input number in any base (2, 8, 10, 16)
- Simultaneous display in all 4 bases
- Live conversion as user types
- Supports up to 64-bit integers

---

## Phase 5 — Financial Calculators

### Phase 5.1 — Loan / EMI Calculator

**File:** `app/finance/loan.html`

**Inputs:**
- Principal amount
- Annual interest rate (%)
- Loan term (months or years)
- Start date

**Outputs:**
- Monthly payment (EMI)
- Total interest payable
- Total amount payable
- Summary bar chart: principal vs interest

**Formula displayed:**
```
EMI = P × [r(1+r)ⁿ] / [(1+r)ⁿ - 1]
```

### Phase 5.2 — Mortgage Calculator

**File:** `app/finance/mortgage.html`
**API:** `POST /api/amortization/table`

Builds a complete mortgage amortization schedule in the Python backend.

**Inputs:**
- Home price
- Down payment ($ or %)
- Loan term (15/20/25/30 years)
- Interest rate
- Property tax rate (%)
- Home insurance ($/year)
- PMI if applicable

**Outputs:**
- Monthly payment breakdown (P&I, Tax, Insurance, PMI)
- Total loan cost over life
- Amortization table: downloadable CSV
- Equity buildup chart (canvas)
- Payoff timeline

### Phase 5.3 — Compound Interest Calculator

**File:** `app/finance/compound-interest.html`

**Inputs:**
- Principal
- Annual rate
- Compounding frequency (daily/monthly/quarterly/annually)
- Time (years)
- Optional: monthly contributions

**Outputs:**
- Final balance
- Total contributions
- Total interest earned
- Year-by-year growth table
- Animated line chart (canvas)

### Phase 5.4 — ROI Calculator

**File:** `app/finance/roi.html`

- Investment amount + final value
- Time period
- Outputs: ROI %, annualized ROI, total gain/loss
- Comparison: vs inflation, vs S&P 500 average

### Phase 5.5 — NPV & DCF Calculator

**File:** `app/finance/npv.html`
**API:** `POST /api/retirement/npv` (reuse Python router)

- Initial investment
- Cash flows (add up to 10 periods)
- Discount rate
- Outputs: NPV, present value of each cash flow, break-even year

### Phase 5.6 — IRR Calculator

**File:** `app/finance/irr.html`
**API:** `POST /api/retirement/irr`

- Initial outflow + multiple period inflows
- Uses Newton-Raphson iteration in Python (scipy)
- Outputs: IRR %, comparison to required rate

### Phase 5.7 — Salary / Paycheck Calculator

**File:** `app/finance/salary.html`

**Inputs:**
- Gross salary (annual / monthly / hourly)
- Pay frequency
- Filing status (for tax brackets)
- Deductions (401k %, health insurance)

**Outputs:**
- Net take-home pay
- Tax breakdown (federal, state placeholder)
- Hourly equivalent

### Phase 5.8 — Tax Estimator

**File:** `app/finance/tax.html`

- Taxable income
- Standard deduction toggle
- Filing status
- Outputs: estimated tax, effective rate, marginal rate
- Note: "For estimation only. Consult a tax professional."

### Phase 5.9 — VAT / GST Calculator

**File:** `app/finance/vat.html`

- Amount (ex-VAT or inc-VAT)
- VAT rate (presets: 5%, 7.5%, 10%, 15%, 20%, custom)
- Instant forward/reverse VAT calculation

### Phase 5.10 — Currency Converter

**File:** `app/finance/currency.html`

- Fetch live exchange rates from `api.exchangerate-api.com` (free tier)
- Support 30+ major currencies
- Conversion table: 1 unit of source → all currencies
- Last updated timestamp

### Phase 5.11 — Savings Goal Planner

**File:** `app/finance/savings-goal.html`

- Goal amount
- Current savings
- Monthly contribution
- Expected return
- Outputs: time to reach goal, month-by-month progress chart

### Phase 5.12 — Retirement Savings Estimator

**File:** `app/finance/retirement.html`
**API:** `POST /api/retirement/project`

- Current age, retirement age
- Current savings, monthly contribution
- Expected annual return
- Expected inflation rate
- Outputs: projected balance, inflation-adjusted, years of sustainable withdrawal, Monte Carlo probability of success

### Phase 5.13 — Break-Even Analysis

**File:** `app/finance/break-even.html`

- Fixed costs, variable cost per unit, price per unit
- Outputs: break-even units, break-even revenue, margin of safety
- Visual: cost/revenue crossover chart

### Phase 5.14 — Profit Margin Calculator

**File:** `app/finance/profit-margin.html`

- Gross, Operating, and Net margin modes
- Revenue + cost inputs
- Markup ↔ Margin conversion

### Phase 5.15 — Crypto P&L Calculator

**File:** `app/finance/crypto.html`

- Buy price, sell price, quantity, fees
- Outputs: profit/loss ($), profit/loss (%), ROI
- Fee impact display

### Phase 5.16 — Simple Interest Calculator

**File:** `app/finance/simple-interest.html`

- P, R, T inputs
- Formula: `I = P × R × T / 100`

---

## Phase 6 — Scientific & Physics Calculators

### Phase 6.1 — Physics Formula Calculator

**File:** `app/science/physics.html`

Tab-based formula selector:

**Kinematics:**
- `v = u + at`
- `s = ut + ½at²`
- `v² = u² + 2as`

**Newton's Laws:**
- `F = ma`
- Weight: `W = mg`

**Energy/Work:**
- `KE = ½mv²`
- `PE = mgh`
- `W = F × d`

Each formula: inputs for known variables, auto-solve for unknown, show units.

### Phase 6.2 — Chemistry Calculator

**File:** `app/science/chemistry.html`

- Molar mass from formula (e.g. H₂O → 18.015 g/mol)
- Molarity: `M = n/V`
- Dilution: `C₁V₁ = C₂V₂`
- Gas Laws (Ideal, Boyle's, Charles's)

### Phase 6.3 — Ohm's Law Calculator

**File:** `app/science/ohm-law.html`

Iconic triangle interface:

```
       V
      ───
     I × R
```

Enter any 2 of V, I, R → solve for third. Also calculate power P = IV.

### Phase 6.4 — Gas Laws Calculator

**File:** `app/science/pressure.html`

- Boyle's Law: P₁V₁ = P₂V₂
- Charles's Law: V₁/T₁ = V₂/T₂
- Combined Gas Law
- Ideal Gas: PV = nRT

### Phase 6.5 — Wavelength / EM Spectrum

**File:** `app/science/wavelength.html`

- `c = λf`
- Input wavelength or frequency → output other + EM spectrum position
- Visual spectrum bar showing location

### Phase 6.6 — Periodic Table Lookup

**File:** `app/science/periodic.html`

- Searchable periodic table grid (inline HTML, not image)
- Click element → show: atomic number, mass, electron config, group, period, state at STP
- Embedded JSON data for all 118 elements

---

## Phase 7 — Health & Fitness Calculators

### Phase 7.1 — BMI Calculator

**File:** `app/health/bmi.html`

- Metric (kg/cm) and Imperial (lbs/ft-in) modes
- Output: BMI value + category badge (Underweight/Normal/Overweight/Obese)
- Visual gauge / needle indicator
- Disclaimer: "BMI is a screening tool, not a diagnostic measure."

### Phase 7.2 — BMR Calculator

**File:** `app/health/bmr.html`

- Mifflin-St Jeor equation (default) + Harris-Benedict (toggle)
- Inputs: sex, age, weight, height
- Output: BMR in kcal/day

### Phase 7.3 — TDEE Calculator

**File:** `app/health/tdee.html`

- BMR × activity multiplier
- Activity levels: Sedentary / Lightly Active / Moderately Active / Very Active / Extra Active
- Output: TDEE + calorie targets for cut (-500), maintenance, bulk (+500)

### Phase 7.4 — Body Fat Percentage

**File:** `app/health/body-fat.html`

- US Navy method: inputs neck, waist, height (+ hips for female)
- Output: body fat %, lean mass, fat mass
- Category badge: Essential / Athlete / Fitness / Average / Obese

### Phase 7.5 — Ideal Weight Calculator

**File:** `app/health/ideal-weight.html`

- Multiple formulas: Devine, Robinson, Miller, Hamwi
- Display all four with range indicator
- Note variance between methods

### Phase 7.6 — Calorie Burn Estimator

**File:** `app/health/calorie.html`

- Activity + duration + body weight
- 30+ activities (running, cycling, swimming, HIIT, walking, etc.)
- Output: kcal burned, equivalent food items

### Phase 7.7 — Daily Water Intake

**File:** `app/health/water-intake.html`

- Weight + activity level + climate
- Output: daily water in liters + glasses
- Animated water fill graphic

### Phase 7.8 — Pregnancy Due Date

**File:** `app/health/pregnancy.html`

- Last menstrual period (LMP) date input
- Naegele's Rule output: EDD
- Weekly milestone timeline display

### Phase 7.9 — Ovulation Calculator

**File:** `app/health/ovulation.html`

- Cycle length + last period start date
- Output: fertile window (5-day range), ovulation day
- Calendar grid highlighting fertile days

### Phase 7.10 — Heart Rate Zones

**File:** `app/health/heart-rate.html`

- Age input → Max HR (220 − age)
- Zones: Rest (below 50%), Fat Burn (50–60%), Cardio (60–70%), Vigorous (70–85%), Peak (85–100%)
- Color-coded zone bars

---

## Phase 8 — Engineering & Tech Calculators

### Phase 8.1 — Universal Unit Converter

**File:** `app/engineering/unit-converter.html`

The most comprehensive single page in the app:

**Categories (tabs):**
- Length (mm → km, in → mi, etc.) — 15+ units
- Weight/Mass — 12+ units
- Temperature (°C, °F, K, °R)
- Area — 10+ units
- Volume — 12+ units
- Speed — 8+ units
- Pressure — 10+ units
- Energy — 10+ units
- Power — 8+ units
- Digital storage — 10+ units (bit → TB)
- Angle (degrees, radians, gradians)
- Fuel economy (mpg, L/100km, km/L)

**UI:** Two-column: category list on left, conversion pair on right. Live update.

### Phase 8.2 — Resistor Color Code

**File:** `app/engineering/resistor.html`

- Visual resistor with color band selector
- Support 4-band and 5-band resistors
- Click band → pick color → display resistance + tolerance
- Reverse: type resistance → show color bands

### Phase 8.3 — Voltage Divider

**File:** `app/engineering/voltage-divider.html`

- Vin, R1, R2 inputs → Vout
- Schematic SVG diagram inline

### Phase 8.4 — Binary / Bitwise Calculator

**File:** `app/engineering/binary.html`

- Bitwise operations: AND, OR, XOR, NOT, NAND, NOR
- Bit shift: left (<<), right (>>)
- Visual bit-by-bit display (32 checkboxes)
- Conversion: binary ↔ decimal ↔ hex ↔ octal

### Phase 8.5 — Hex Color Converter

**File:** `app/engineering/hex.html`

- Input: HEX / RGB / HSL / HSV
- Live color swatch preview
- Contrast ratio calculator (WCAG AA/AAA pass/fail)
- Color name lookup

### Phase 8.6 — IP Subnet Calculator

**File:** `app/engineering/ip-subnet.html`

- Input: IP address + subnet mask (or CIDR notation)
- Outputs: Network address, broadcast, usable range, number of hosts
- Wildcard mask, binary representation

### Phase 8.7 — Data Storage Converter

**File:** `app/engineering/data-storage.html`

- Bit, Byte, KB, MB, GB, TB, PB, EB (decimal & binary)
- Live comparison table

### Phase 8.8 — Bandwidth / Transfer Time

**File:** `app/engineering/bandwidth.html`

- File size + connection speed → transfer time
- Show in seconds, minutes, hours
- Common speed presets: 5G, Fiber, Cable, DSL, 3G

---

## Phase 9 — Everyday & Utility Calculators

### Phase 9.1 — Age Calculator

**File:** `app/everyday/age.html`

- Date of birth input
- Outputs: years, months, days, hours, minutes (live ticking)
- Next birthday countdown
- Day of week born

### Phase 9.2 — Date Difference Calculator

**File:** `app/everyday/date-diff.html`

- Start date + end date
- Outputs: total days, weeks, months, years, working days (excl. weekends)
- Calendar visual of range

### Phase 9.3 — Time Zone Converter

**File:** `app/everyday/time-zone.html`

- Pick source timezone + time
- Select 3+ target timezones
- Live clock display for each
- DST aware

### Phase 9.4 — Tip & Bill Splitter

**File:** `app/everyday/tip.html`

- Bill total, tip %, number of people
- Per-person amount, tip per person
- Round up toggle
- Common tip presets: 10%, 15%, 18%, 20%, 25%

### Phase 9.5 — Discount Calculator

**File:** `app/everyday/discount.html`

- Original price + discount % → sale price + savings
- Reverse: original price + sale price → discount %
- Stack discounts: 20% off then additional 10% off

### Phase 9.6 — Fuel Cost Calculator

**File:** `app/everyday/fuel.html`

- Distance, fuel efficiency (MPG or L/100km), fuel price
- Outputs: total cost, fuel needed
- Presets: common cars, electric vehicle comparison

### Phase 9.7 — Speed / Distance / Time

**File:** `app/everyday/speed-distance.html`

- Triangle interface: enter any 2 → solve third
- Unit toggles: km/mph, km/mi
- ETA calculator: start time + duration → arrival

### Phase 9.8 — Cooking Unit Converter & Recipe Scaler

**File:** `app/everyday/cooking.html`

- Cups, tablespoons, teaspoons, ml, liters, oz, grams
- Recipe scaler: enter original servings + target servings → scale all ingredients
- Oven temperature: °F ↔ °C ↔ Gas Mark

### Phase 9.9 — Grade / GPA Calculator

**File:** `app/everyday/grade.html`

- Add courses with credits + grades (letter or numeric)
- GPA on 4.0 scale
- "What grade do I need?" mode: enter current grade + final exam weight → required score

### Phase 9.10 — Random Number / Password Generator

**File:** `app/everyday/random-number.html`

**Tab 1: Random Number**
- Min, Max, Count
- Integer or decimal toggle

**Tab 2: Password Generator**
- Length slider (8–64)
- Toggle: uppercase, lowercase, numbers, symbols
- Strength meter
- Copy button + toast

---

## Phase 10 — Python Microservice (Complex Engines)

**Goal:** Implement all Python API routes for computationally complex calculators.

### Phase 10.1 — Amortization Router

**File:** `api/routers/amortization.py`

```python
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import numpy as np

router = APIRouter()

class MortgageInput(BaseModel):
    principal: float
    annual_rate: float
    term_years: int
    extra_payment: float = 0

class AmortizationRow(BaseModel):
    month: int
    payment: float
    principal: float
    interest: float
    balance: float

@router.post("/table", response_model=List[AmortizationRow])
def amortization_table(data: MortgageInput):
    r = data.annual_rate / 100 / 12
    n = data.term_years * 12
    pmt = data.principal * r * (1+r)**n / ((1+r)**n - 1)
    
    rows = []
    balance = data.principal
    for month in range(1, n+1):
        interest = balance * r
        principal = pmt - interest + data.extra_payment
        balance = max(0, balance - principal)
        rows.append(AmortizationRow(
            month=month, payment=pmt,
            principal=principal, interest=interest, balance=balance
        ))
        if balance == 0:
            break
    return rows
```

### Phase 10.2 — Statistics Router

**File:** `api/routers/statistics.py`

```python
# Endpoints:
# POST /api/statistics/describe  → full descriptive stats
# POST /api/statistics/histogram → histogram bins + frequencies
# POST /api/statistics/regression → linear regression (m, b, R²)
```

Implement using `numpy` and `scipy.stats`.

### Phase 10.3 — Matrix Router

**File:** `api/routers/matrix.py`

```python
# Endpoints:
# POST /api/matrix/multiply   → matrix multiplication
# POST /api/matrix/inverse    → matrix inverse (numpy.linalg.inv)
# POST /api/matrix/determinant → determinant
# POST /api/matrix/eigenvalues → eigenvalues + eigenvectors
```

### Phase 10.4 — Retirement Router

**File:** `api/routers/retirement.py`

```python
# Endpoints:
# POST /api/retirement/project   → compound growth projection + inflation adj
# POST /api/retirement/monte-carlo → 1000-run Monte Carlo simulation
# POST /api/retirement/npv       → net present value
# POST /api/retirement/irr       → IRR via scipy.optimize.brentq
```

### Phase 10.5 — API Integration in JS

**File:** `assets/js/engines/api-client.js`

```js
const API_BASE = 'http://localhost:8000';  // configurable

const CalcAPI = {
  async post(endpoint, data) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  },
  
  amortization: (data) => CalcAPI.post('/api/amortization/table', data),
  statistics: (data) => CalcAPI.post('/api/statistics/describe', data),
  matrix: (op, data) => CalcAPI.post(`/api/matrix/${op}`, data),
  retirement: (data) => CalcAPI.post('/api/retirement/project', data),
};
```

**Graceful fallback:** If Python API is unavailable, show a yellow warning banner: "Advanced calculation engine offline. Results may be limited." and fall back to JS approximations.

---

## Phase 11 — AI & Coming Soon Features

### Phase 11.1 — Coming Soon Page Template

**File:** `app/coming-soon/_template.html`

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ✨          ✨          ✨                                   │
│                                                              │
│         AI-Powered Math Solver                               │
│                                                              │
│   "What's the monthly payment on a $450,000 home            │
│    at 6.5% over 30 years with 20% down?"                    │
│                                                              │
│   ↳ Your monthly payment would be $2,275.36...              │
│                                                              │
│         ─────────────────────────────                        │
│                 Coming Soon                                  │
│         ─────────────────────────────                        │
│                                                              │
│   Be the first to know when AI features launch.             │
│                                                              │
│   ┌────────────────────────────────┐ ┌───────────────┐      │
│   │ your@email.com                 │ │ Notify Me →   │      │
│   └────────────────────────────────┘ └───────────────┘      │
│                                                              │
│   Meanwhile, try our regular calculators →                  │
└──────────────────────────────────────────────────────────────┘
```

**Design:** Dark card with animated gradient border (`#77d202 → transparent → #000000` rotating animation), glowing sparkle icons, blurred "demo output" teaser text.

### Phase 11.2 — AI Math Solver Preview

**File:** `app/coming-soon/ai-math.html`

Features to tease (non-functional demo UI):
- Natural language input field
- Step-by-step solution display
- Multi-step problem solving
- Graph generation from description
- Formula extraction from word problems

### Phase 11.3 — Smart Budget AI Preview

**File:** `app/coming-soon/smart-budget.html`

Features to tease:
- Income + expense categorization via AI
- Savings recommendations
- Spending pattern analysis
- "What if" scenario modeling

### Phase 11.4 — Coming Soon Badge Component

Used in sidebar and dashboard for AI items:

```html
<span class="coming-soon-badge">
  <span class="badge-dot"></span>
  Coming Soon
</span>
```

```css
.coming-soon-badge {
  @apply inline-flex items-center gap-1.5;
  @apply px-2 py-0.5 rounded-full text-xs font-medium;
  @apply bg-gradient-to-r from-primary/20 to-black/30;
  @apply border border-primary/30 text-primary;
}

.badge-dot {
  @apply w-1.5 h-1.5 rounded-full bg-primary;
  animation: pulse 2s infinite;
}
```

---

## Phase 12 — Polish, Accessibility & PWA

### Phase 12.1 — Responsive Design

All pages must be fully functional at:
- 320px (min mobile)
- 375px (iPhone SE)
- 414px (iPhone Plus)
- 768px (tablet)
- 1024px (laptop)
- 1280px (desktop)
- 1440px+ (wide desktop)

**Mobile behavior:**
- Sidebar becomes bottom sheet / slide-over
- Keypad fills viewport bottom half
- Display fixed at top
- Category navigation becomes horizontal scroll tabs

**Tablet behavior:**
- Sidebar collapses to icon-only by default
- Calculator content fills available space
- Side-by-side layout for form+result where applicable

### Phase 12.2 — Accessibility (WCAG 2.1 AA)

- All keypad buttons: proper `aria-label` (e.g., `aria-label="Divide"` for ÷)
- Live region for display output: `aria-live="polite"` on result element
- All icons paired with visible or SR-only text
- Focus visible on all interactive elements
- Color contrast: minimum 4.5:1 for normal text, 3:1 for large text
- `aria-current="page"` on active nav item
- Skip link at top: "Skip to calculator"

### Phase 12.3 — PWA Configuration

**manifest.json:**
```json
{
  "name": "CalcVerse",
  "short_name": "CalcVerse",
  "description": "Every calculator you'll ever need",
  "start_url": "/app/dashboard.html",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#77d202",
  "icons": [
    { "src": "/assets/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/assets/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**service-worker.js:**
- Cache all static assets on install
- Network-first for API calls
- Offline fallback page

### Phase 12.4 — Performance

- Fonts: preloaded with `<link rel="preload">`; subset to used characters
- CSS: purge unused Tailwind classes in production build
- JS: one file per calculator — loaded only when that page is active
- Images: none required (icon sprite + CSS shapes only)
- Calculator engines: lazy-loaded with dynamic `import()`

### Phase 12.5 — Animations & Micro-interactions

**Global animations:**
- Page transitions: 150ms fade
- Sidebar expand/collapse: 250ms ease-out
- Keypad press: `scale(0.94)` 75ms → `scale(1.0)` 75ms
- Result update: 200ms slide-up + fade
- Theme switch: 300ms `transition-colors` on all elements
- Card hover: `translateY(-2px)` + shadow deepens, 150ms

**Do NOT animate:**
- Anything that flashes (seizure risk)
- Elements when `prefers-reduced-motion: reduce` is set

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Phase 13 — Testing & QA

### Phase 13.1 — Calculator Logic Testing

For each calculator, create a test file at `tests/[category]/[name].test.js`:

Test categories:
- Happy path (normal input)
- Edge cases (zero, negative, very large)
- Invalid input (letters, NaN, overflow)
- Formula accuracy (verified against known results)

**Example (Loan Calculator):**
```js
// tests/finance/loan.test.js
describe('Loan EMI Calculator', () => {
  test('$100,000 at 5% for 30 years = $536.82/month', () => {
    expect(calcEMI(100000, 5, 30)).toBeCloseTo(536.82, 2);
  });
  test('handles 0% interest', () => {
    expect(calcEMI(12000, 0, 1)).toBeCloseTo(1000, 2);
  });
  test('throws on negative principal', () => {
    expect(() => calcEMI(-1000, 5, 10)).toThrow();
  });
});
```

### Phase 13.2 — Python API Testing

**File:** `api/tests/test_amortization.py`

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_amortization_30yr():
    res = client.post("/api/amortization/table", json={
        "principal": 300000,
        "annual_rate": 6.5,
        "term_years": 30
    })
    assert res.status_code == 200
    rows = res.json()
    assert len(rows) == 360
    assert abs(rows[0]['payment'] - 1896.20) < 0.50
```

### Phase 13.3 — Cross-Browser Testing Checklist

Test in:
- Chrome 120+ (primary)
- Firefox 120+
- Safari 16+ (iOS and macOS)
- Edge 120+
- Chrome on Android
- Safari on iPhone

Test with:
- Light mode
- Dark mode
- System dark mode (auto-detect)
- Keyboard-only navigation
- Screen reader (VoiceOver on macOS)

### Phase 13.4 — QA Checklist per Calculator

For every calculator, verify:

- [ ] All inputs accept valid values
- [ ] Invalid inputs show clear error (no crash)
- [ ] Result is mathematically correct (cross-check with alternative tool)
- [ ] Result displays in correct units
- [ ] Copy button works
- [ ] History records the calculation
- [ ] Favorite button toggles state
- [ ] On-screen keypad keys all work
- [ ] Physical keyboard bindings all work
- [ ] Responsive on mobile (375px)
- [ ] Accessible by keyboard-only
- [ ] Dark mode renders correctly
- [ ] Formula reference shows correct formula
- [ ] Page title and meta description are accurate

---

## Keyboard Architecture

### Full Keyboard Mapping Reference

| Physical Key | Action | Context |
|---|---|---|
| `0`–`9` | Number input | All numeric calcs |
| `.` | Decimal point | All numeric calcs |
| `+` | Addition | Standard / Scientific |
| `-` | Subtraction | Standard / Scientific |
| `*` | Multiplication | Standard / Scientific |
| `/` | Division (prevents browser find) | Standard / Scientific |
| `Enter` | Equals / Calculate | All calcs |
| `Backspace` | Delete last character | All calcs |
| `Delete` | Clear all (CE) | All calcs |
| `Escape` | Clear all (C) | All calcs |
| `F9` | Toggle positive/negative | Standard |
| `%` | Percentage | Standard |
| `s` | sin | Scientific mode |
| `c` | cos | Scientific mode |
| `t` | tan | Scientific mode |
| `l` | log | Scientific mode |
| `n` | ln | Scientific mode |
| `q` | √ | Scientific mode |
| `p` | π | Scientific mode |
| `e` | e constant | Scientific mode |
| `^` | Power (xʸ) | Scientific mode |
| `(` / `)` | Parentheses | Scientific mode |
| `!` | Factorial | Scientific mode |
| `/` (focus search) | Focus search bar | Dashboard |
| `?` | Show keyboard shortcuts | All pages |
| `Tab` | Move to next input | Form calcs |
| `Shift+Tab` | Move to prev input | Form calcs |
| `Arrow Up/Down` | Increment/decrement inputs | Form calcs |

### On-Screen Keypad Key Highlight

When a physical key is pressed, the corresponding on-screen button receives:
```css
.calc-key.active {
  @apply scale-95 bg-primary/20 border-primary;
  transition: none; /* instant visual feedback */
}
```

Class removed after 150ms.

---

## File Structure Reference

### Naming Conventions

```
HTML files:   kebab-case.html          (basic.html, compound-interest.html)
JS files:     kebab-case.js            (finance-engine.js, basic.js)
CSS classes:  BEM-lite with prefix     (.calc-key, .calc-key--operator, .sidebar__item)
JS classes:   PascalCase               (CalcVerseSidebar, KeyboardBridge)
Functions:    camelCase                (calcEMI, formatCurrency)
Constants:    SCREAMING_SNAKE          (API_BASE, MAX_HISTORY_ITEMS)
```

### JavaScript Module Pattern

Each calculator file follows this structure:

```js
// assets/js/calculators/mortgage.js

import { FinanceEngine } from '../engines/finance-engine.js';
import { CalcVerseKeypad } from '../components/keypad.js';
import { CalcStorage } from '../core/storage.js';

class MortgageCalculator {
  constructor() {
    this.keypad = new CalcVerseKeypad({ layout: 'financial', target: this });
    this.history = CalcStorage;
    this.init();
  }
  
  init() {
    this.bindInputs();
    this.keypad.render(document.querySelector('#keypad-container'));
    this.loadHistory();
  }
  
  calculate() {
    const inputs = this.getInputs();
    if (!this.validate(inputs)) return;
    
    const result = FinanceEngine.mortgage(inputs);
    this.displayResult(result);
    this.history.addHistory('fin-mortgage', {
      expression: this.buildExpression(inputs),
      result: result.monthly_payment,
      timestamp: Date.now()
    });
  }
  
  validate(inputs) { ... }
  getInputs() { ... }
  displayResult(result) { ... }
  buildExpression(inputs) { ... }
}

// Mount when DOM ready
document.addEventListener('DOMContentLoaded', () => new MortgageCalculator());
```

---

## Build & Deployment

### Development Setup

```bash
# Clone and install
git clone https://github.com/your-org/calcverse.git
cd calcverse
npm install

# Start Tailwind watch
npm run dev

# Start Python API
cd api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Open
open index.html  # or use Live Server extension
```

### package.json Scripts

```json
{
  "scripts": {
    "dev": "tailwindcss -i ./assets/css/main.css -o ./assets/css/output.css --watch",
    "build": "tailwindcss -i ./assets/css/main.css -o ./assets/css/output.css --minify",
    "test": "jest tests/",
    "lint": "eslint assets/js/"
  }
}
```

### Production Build

```bash
npm run build        # Minify Tailwind CSS
# Deploy static files to any CDN / hosting (Vercel, Netlify, Cloudflare Pages)
# Deploy Python API to Railway / Render / DigitalOcean
```

---

## Progress Tracker

Track each phase with this checklist:

### Phase 0 — Foundation
- [ ] 0.1 Project init & Tailwind config
- [ ] 0.2 Directory structure created
- [ ] 0.3 Base HTML template with anti-FOUC
- [ ] 0.4 Python API scaffold

### Phase 1 — Design System
- [ ] 1.1 CSS tokens & main.css
- [ ] 1.2 Sidebar component
- [ ] 1.3 Display component
- [ ] 1.4 Keypad engine (5 layouts)
- [ ] 1.5 Keyboard bridge
- [ ] 1.6 Theme engine
- [ ] 1.7 History & favorites
- [ ] 1.8 Toast & modal

### Phase 2 — Marketing Pages
- [ ] 2.1 Homepage (hero, categories, features, AI teaser, footer)
- [ ] 2.2 About page
- [ ] 2.3 404 page

### Phase 3 — Dashboard Shell
- [ ] 3.1 Dashboard layout
- [ ] 3.2 Dashboard home view
- [ ] 3.3 Search system
- [ ] 3.4 Calculator page template

### Phase 4 — Math (10 calculators)
- [ ] Basic Calculator
- [ ] Scientific Calculator
- [ ] Algebra Solver
- [ ] Percentage Calculator
- [ ] Fraction Calculator
- [ ] Prime Number Calculator
- [ ] Matrix Calculator
- [ ] Statistics Calculator
- [ ] Function Grapher
- [ ] Number Base Converter

### Phase 5 — Finance (16 calculators)
- [ ] Loan / EMI
- [ ] Mortgage + Amortization
- [ ] Compound Interest
- [ ] Simple Interest
- [ ] ROI
- [ ] NPV
- [ ] IRR
- [ ] Salary
- [ ] Tax Estimator
- [ ] VAT / GST
- [ ] Currency Converter
- [ ] Savings Goal
- [ ] Retirement Estimator
- [ ] Break-Even
- [ ] Profit Margin
- [ ] Crypto P&L

### Phase 6 — Science (8 calculators)
- [ ] Physics Formulas
- [ ] Chemistry
- [ ] Ohm's Law
- [ ] Force
- [ ] Gas Laws
- [ ] Energy/Work
- [ ] Wavelength
- [ ] Periodic Table

### Phase 7 — Health (10 calculators)
- [ ] BMI
- [ ] BMR
- [ ] TDEE
- [ ] Body Fat
- [ ] Ideal Weight
- [ ] Calorie Burn
- [ ] Water Intake
- [ ] Pregnancy Due Date
- [ ] Ovulation
- [ ] Heart Rate Zones

### Phase 8 — Engineering (8 calculators)
- [ ] Unit Converter
- [ ] Resistor Color Code
- [ ] Voltage Divider
- [ ] Binary / Bitwise
- [ ] Hex Color Converter
- [ ] IP Subnet
- [ ] Data Storage
- [ ] Bandwidth

### Phase 9 — Everyday (10 calculators)
- [ ] Age
- [ ] Date Difference
- [ ] Time Zone
- [ ] Tip & Splitter
- [ ] Discount
- [ ] Fuel Cost
- [ ] Speed/Distance/Time
- [ ] Cooking Units
- [ ] Grade / GPA
- [ ] Random / Password

### Phase 10 — Python Microservice
- [ ] 10.1 Amortization router
- [ ] 10.2 Statistics router
- [ ] 10.3 Matrix router
- [ ] 10.4 Retirement router
- [ ] 10.5 JS API client + fallback

### Phase 11 — Coming Soon / AI
- [ ] 11.1 Coming soon template
- [ ] 11.2 AI Math Solver page
- [ ] 11.3 Smart Budget AI page
- [ ] 11.4 Coming soon badge component

### Phase 12 — Polish
- [ ] 12.1 Responsive (all breakpoints)
- [ ] 12.2 Accessibility audit
- [ ] 12.3 PWA manifest + service worker
- [ ] 12.4 Performance optimization
- [ ] 12.5 Animations & micro-interactions

### Phase 13 — Testing
- [ ] 13.1 JS unit tests (all calculators)
- [ ] 13.2 Python API tests
- [ ] 13.3 Cross-browser testing
- [ ] 13.4 QA checklist (all 62 calculators)

---

## Summary

| Metric | Count |
|--------|-------|
| Total Calculators | 64 (62 live + 2 coming soon) |
| Categories | 7 |
| HTML Pages | 75+ |
| JS Files | 80+ |
| Python API Endpoints | 12 |
| CSS Component Classes | 40+ |
| Build Phases | 13 |
| Sub-phases | 55+ |

---

*CalcVerse — Built for precision. Designed for humans.*

*Primary: `#77d202` · Gradient: `#77d202 → #000000` · Stack: HTML + Tailwind + JS + Python*