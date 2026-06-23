# CalcVerse Design System v3.0

> A dark/light-mode responsive calculator web app with 64 calculators across 7 categories.

---

## 1. Brand Identity

### Brand Name
CalcVerse — "Your Universe of Calculations"

### Design Philosophy
- **Functional first**: Every element has a purpose. No decorative fluff.
- **Dark-first**: Dark mode is the default, light mode is the secondary variant.
- **Physical affordance**: UI elements mimic real-world objects (3D calculator keys, card shadows, slide-in sidebar).
- **Accessible**: WCAG-compliant focus states, skip links, labels, and reduced-motion support.

---

## 2. Color System

### 2.1 Primary Brand Color
The entire app uses a single vibrant green as the accent. No gradients are used — solid color only.

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#77d202` | Buttons, active states, links, badges, keypad operators |
| `primary-dark` | `#5aaa00` | Button hover states |
| `primary-light` | `#a3e84a` | Highlights, secondary accents |

### 2.2 Surface Colors

#### Light Mode
| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| bg-base | `--bg-base` | `#f3f5f6` | Page background |
| bg-surface | `--bg-surface` | `#ffffff` | Cards, modals, sidebar |
| bg-surface-raised | `--bg-surface-raised` | `#eef0f1` | Hover states, elevated surfaces |
| border-light | `--border-light` | `#dde1e4` | Borders, dividers |
| text-primary | `--text-primary` | `#0d0f10` | Headings, primary text |
| text-secondary | `--text-secondary` | `#4a5568` | Body text |
| text-muted | `--text-muted` | `#8e9aab` | Placeholders, captions |

#### Dark Mode
| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| bg-base | `--bg-base` | `#000000` | Page background |
| bg-surface | `--bg-surface` | `#0f1010` | Cards, modals, sidebar |
| bg-surface-raised | `--bg-surface-raised` | `#1a1c1c` | Cards in dark mode (Tailwind token: `raised-dark`) |
| border-light | `--border-light` | `#2a2e2e` | Borders, dividers |
| text-primary | `--text-primary` | `#f3f5f6` | Headings |
| text-secondary | `--text-secondary` | `#a0aec0` | Body text |
| text-muted | `--text-muted` | `#5a6377` | Placeholders |

### 2.3 Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| success | `#77d202` | Success toasts, positive values |
| warning | `#f5a623` | Warning toasts, alerts |
| error | `#e53e3e` | Error toasts, error states, clear keys |
| info | `#3182ce` | Info toasts |

### 2.4 Keypad-Specific Colors
| Element | Light | Dark |
|---------|-------|------|
| Keypad container bg | `gray.900` (`#111827`) | `#1a1c1c` |
| Number keys | `white` → `gray.200` (active) | `#353839` → `#454849` (active) |
| Operator keys | `#77d202` (primary) | `#77d202` (primary) |
| Equals key | `#77d202` + deeper shadow (`#4a8500`) | Same |
| Clear key | `#fef2f2` → `#fee2e2` (hover) | `#3b1a1a` → `#4a2222` (hover) |
| Function keys | `gray.100` | `#353839` |

---

## 3. Typography

### 3.1 Font Stack
| Context | Font Stack |
|---------|-----------|
| Body / UI | `Inter`, `system-ui`, `sans-serif` |
| Numbers / Code | `JetBrains Mono`, `Courier New`, `monospace` |

### 3.2 Font Sizes (CSS Custom Properties)
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-display: 3.5rem;  /* 56px */
--text-jumbo: 5rem;      /* 80px */
```

### 3.3 Font Weights
| Weight | Usage |
|--------|-------|
| 300 (Light) | Display numbers |
| 400 (Regular) | Body text, inputs |
| 500 (Medium) | Labels, buttons |
| 600 (Semibold) | Buttons, category headers |
| 700 (Bold) | Headings, operator keys |
| 800 (Extra Bold) | Equals key, stat values |
| 900 (Black) | Hero text |

### 3.4 Tailwind Typography Classes
```css
.font-sans  → Inter, system-ui, sans-serif
.font-mono  → JetBrains Mono, Courier New, monospace
```

---

## 4. Spacing & Sizing

### 4.1 Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Small badges, dots |
| `--radius-md` | 8px | Button corners |
| `--radius-lg` | 12px | Cards, keypad keys |
| `--radius-xl` | 16px | Modals, large cards, keypad container |
| `--radius-2xl` | 24px | Hero sections |
| `--radius-full` | 9999px | Pills, badges, toggle buttons |

### 4.2 Shadows
| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.12)` |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.18)` |
| `--shadow-glow` | `0 0 20px rgba(119,210,2,0.25)` |
| `shadow-glow-lg` | `0 0 40px rgba(119,210,2,0.35)` |

### 4.3 Key 3D Shadows (Keypad)
Each key has a multi-layered box-shadow for physical depth:
```css
/* Default (raised) */
box-shadow: 0 3px 0 rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1);

/* Pressed (active) */
transform: translateY(2px);
box-shadow: 0 1px 0 rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1);

/* Equals key (extra depth) */
box-shadow: 0 4px 0 #4a8500, 0 2px 4px rgba(0,0,0,0.15);
/* Pressed: translateY(3px) */
```

---

## 5. Layout System

### 5.1 Page Structure
```
┌──────────────────────────────────────┐
│            <main id="main-content">   │
│  ┌────────────────────────────────┐  │
│  │  Header (sticky, z-20, glass)  │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │  Page Content (p-6)           │  │
│  │  max-w-6xl mx-auto            │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  Sidebar (left, fixed, z-50)         │
│  • w-64 (expanded)                   │
│  • w-16 (collapsed, icons only)      │
│  • -translate-x-full (mobile hidden) │
└──────────────────────────────────────┘
```

### 5.2 Responsive Breakpoints

| Breakpoint | Width | Sidebar State | Main Content Margin |
|------------|-------|---------------|---------------------|
| **Mobile** | `< 768px` | Hidden offscreen (`-translate-x-full`), full-width when shown via overlay | `margin-left: 0` |
| **Tablet** | `768px – 1023px` | Collapsed (`w-16`), icons only, visible inline | `margin-left: 64px` |
| **Desktop** | `>= 1024px` | Expanded (`w-64`), full nav, visible inline | `margin-left: 256px` (or `64px` if collapsed) |

### 5.3 Sidebar Navigation States
- **Desktop initial**: Expanded (`collapsed: false`) at >= 1024px
- **Tablet initial**: Collapsed (`collapsed: true`) at < 1024px
- **Mobile initial**: Collapsed + hidden offscreen at < 768px
- **When shown on mobile**: Slides in as full-width overlay (w-64) with dark backdrop (z-40, `bg-black/50`)
- **Overlay click**: Dismisses sidebar, restores body scroll

### 5.4 Calculator Page Layout
```html
<div class="calc-page">
  <div class="calc-header">
    <div>
      <span class="calc-category-badge">Category</span>
      <h1 class="calc-title">Calculator Name</h1>
      <p class="calc-description">Description text</p>
    </div>
    <div class="calc-actions">
      <!-- Favorite, Share, Help buttons -->
    </div>
  </div>
  <div class="calc-body">
    <div class="calc-display-panel"><!-- Display --></div>
    <div class="calc-form-box"><!-- Inputs + Keypad --></div>
  </div>
</div>
```

---

## 6. Component Library

### 6.1 Buttons

#### `.btn-primary`
- **Style**: Rounded-full (`9999px`), solid green bg, white text
- **Size**: `px-6 py-3`, text-sm, font-semibold
- **States**: Hover → `bg-primary-dark`, translateY(-1px); Active → `scale-[0.98]`; Disabled → opacity-50

#### `.btn-secondary`
- **Style**: Rounded-full, transparent bg, `border-2 border-primary`, primary text
- **States**: Hover → `bg-primary/10`, translateY(-1px)

#### `.btn-ghost`
- **Style**: Rounded-lg, transparent, gray text
- **States**: Hover → `bg-gray-100` (dark: `bg-gray-800`)

#### `.btn-icon`
- **Style**: `w-10 h-10 rounded-xl`, icon-sized
- **States**: Hover → gray bg; Active → `scale-95`

### 6.2 Cards

#### `.card` (base)
```css
bg-white dark:bg-raised-dark rounded-xl
border border-gray-200 dark:border-gray-700
shadow-sm
```

#### `.card-hover` (interactive)
Extends `.card` with: `hover:shadow-md hover:-translate-y-0.5 cursor-pointer`

#### `.card-gradient-border` (featured / category cards)
Extends `.card` with a **solid green left border** (left accent strip):
```css
.card-gradient-border::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 4px; height: 100%;
  background: #77d202;  /* solid primary, NOT a gradient */
  border-radius-left: 12px;
}
```

### 6.3 Inputs

#### `.input-field`
```css
w-full px-4 py-3 rounded-xl
bg-white dark:bg-raised-dark
border border-gray-200 dark:border-gray-700
font-sans text-base
Focus: border-primary, ring-2 ring-primary/20
```

#### `.input-label`
```css
block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5
```

#### `.input-group`
- Flex column wrapper for label + input pairs

### 6.4 Badges

| Class | Style |
|-------|-------|
| `.badge-primary` | `bg-primary/10 text-primary`, rounded-full, text-xs |
| `.badge-coming-soon` | `bg-primary/10 border border-primary/30`, with animated dot |
| `.badge-dot` | `w-1.5 h-1.5 rounded-full bg-primary`, pulsing animation |

### 6.5 Calculator Keypad (Casio/Phone-Style 3D Keys)

#### Keypad Container
```
border-radius: 16px
padding: 4px
background: theme('colors.gray.900')  /* Light mode */
background: #1a1c1c                    /* Dark mode */
```

#### Grid Layouts
| Layout | Columns | Gap |
|--------|---------|-----|
| Standard (`.keypad-standard`) | `repeat(4, 1fr)` | 6px |
| Scientific Extension (`.keypad-sci-ext`) | `repeat(5, 1fr)` | 6px |
| Financial (`.keypad-financial`) | `repeat(4, 1fr)` | 6px |

#### Key Sizing
| Key Type | Height | Font Size | Radius |
|----------|--------|-----------|--------|
| Default (`.calc-key`) | 60px | 1.125rem (18px) | 12px |
| Number (`.calc-key-num`) | 60px | 1.25rem (20px) | 12px |
| Function (`.calc-key-fn`) | 48px | 0.75rem (12px) | 12px |
| Equals (`.calc-key-equals`) | 60px | 1.375rem (22px) | 12px |
| Wide (`.calc-key-wide`) | 60px | grid-column: span 2 | 12px |

**Mobile (<= 480px)**: Keys reduce to 52px height (fn: 42px), 10px radius, smaller font.
**Tablet (481-768px)**: Keys at 56px height (fn: 44px).

#### Key Types & Colors

| Class | Light BG | Dark BG | Text Color | Usage |
|-------|----------|---------|------------|-------|
| `.calc-key` (default) | `gray.100` | `#2a2e2e` | `gray.900` / `gray.100` | Default fallback |
| `.calc-key-num` | `white` | `#353839` | `gray.900` / `gray.100` | 0-9, decimal |
| `.calc-key-op` | `#77d202` | `#77d202` | `white` | +, −, ×, ÷ |
| `.calc-key-equals` | `#77d202` | `#77d202` | `white` | = (extra shadow) |
| `.calc-key-clear` | `#fef2f2` | `#3b1a1a` | `#dc2626` / `#f87171` | C, clear |
| `.calc-key-fn` | `gray.100` | `#353839` | `gray.600` / `gray.400` | sin, cos, log, etc. |

**3D Shadow Effect**: Each key has `box-shadow: 0 3px 0 rgba(0,0,0,0.15)` for raised appearance. On press: `translateY(2px)` with reduced shadow.

#### Hover (non-touch devices only via `@media (hover: hover)`)
- Number/function keys: `filter: brightness(0.97)` (light) / `brightness(1.1)` (dark)
- Operator/equals keys: `filter: brightness(1.08)`
- Clear key: background change

### 6.6 Display Panel (Calculator)

```html
<div class="calc-display">
  <div class="calc-display-expression">Expression text</div>
  <div class="calc-display-result">Result value</div>
</div>
```

- **Expression**: `text-sm text-gray-500`, right-aligned, mono font, scrollable
- **Result**: `text-display (3.5rem) font-bold font-mono`, right-aligned
- **Error state**: Result gets `.error` class → `text-red-500` + shake animation
- **Success state**: Result gets `.success` class → `text-primary`

### 6.7 Stat Cards (Dashboard)

```html
<div class="stat-card">
  <div class="stat-value">64</div>
  <div class="stat-label">Calculators</div>
</div>
```
- Centered text layout
- Value: `text-3xl font-bold font-mono text-primary` with hover scale effect
- Label: `text-sm text-gray-500`

### 6.8 Modal System

| Property | Value |
|----------|-------|
| Backdrop | `.modal-backdrop`: `bg-black/50` (dark: `bg-black/70`), `backdrop-filter: blur(4px)` (dark: `blur(8px)`) |
| Container | Fixed inset-0, z-50, flex centered |
| Panel | Rounded-2xl (`16px`), `bg-white dark:bg-raised-dark`, `border`, `shadow-xl` |
| Sizes | sm: `max-w-md`, md: `max-w-lg`, lg: `max-w-2xl` |
| Max height | `85vh` with scrollable body |
| Close | Escape key, backdrop click, X button |
| Animation | `.animate-slide-up` on open |

### 6.9 Toast Notifications

| Property | Value |
|----------|-------|
| Position | Fixed bottom-4 right-4, z-50 |
| Container | Flex column, gap-2, pointer-events-none |
| Toast | `min-w-[280px] max-w-[400px]`, rounded-xl, `border-l-4` |
| Animation | `.animate-slide-up` on enter, fade+slide-right on dismiss |
| Types | success (green), error (red), warning (yellow), info (blue) |
| Auto-dismiss | 3000ms default, adjustable |
| Dismiss | Manual via × button or auto | 

### 6.10 Everyday Pages

| Class | Usage |
|-------|-------|
| `.everyday-card` | Converter card container (extends `.card`) |
| `.everyday-grid` | 3-column grid (1fr auto 1fr) for From/Swap/To layout |
| `.everyday-select` | Unit dropdown selector |
| `.everyday-input` | Number input (mono, right-aligned, text-lg) |
| `.everyday-result` | Read-only result display (mono, primary text, bold) |
| `.everyday-ref-grid` | 2-column grid for quick reference values |
| `.everyday-ref-item` | Reference item with `.label` and `.value` children |

---

## 7. Calculator Display & Results

### 7.1 Form-Based Calculator Results
```html
<div class="calc-result-display">
  <div class="calc-result-label">Result</div>
  <div class="calc-result-value">1,234.56</div>
  <div class="calc-result-breakdown">
    <div class="calc-result-item">
      <div class="calc-result-item-label">Label</div>
      <div class="calc-result-item-value">Value</div>
    </div>
  </div>
</div>
```
- Result display: `bg-primary/[0.06]`, `border border-primary/20`, rounded-xl
- Result value: `text-3xl sm:text-4xl font-bold font-mono text-primary`
- Breakdown grid: `grid-cols-2 sm:grid-cols-3 gap-3`

### 7.2 History Panel
```html
<div class="calc-history-panel">
  <!-- Slides in from right -->
  <!-- Each item: .calc-history-item -->
  <!-- Expression: .calc-history-expression -->
  <!-- Result: .calc-history-result -->
</div>
```
- Panel slides in/out via `.open` / `.closed` classes
- Toggle is `translateX(0)` / `translateX(100%)`

---

## 8. Animation & Motion

### 8.1 Keyframes

| Name | Duration | Description |
|------|----------|-------------|
| `fadeIn` | 0.3s | `opacity: 0 → 1` |
| `slideUp` | 0.4s | `translateY(10px) → 0` + fade in |
| `keyPress` | 0.1s | `scale(1) → 0.94 → 1` |
| `pulseGlow` | 2s infinite | Box-shadow pulse glow effect |
| `blink` | 1s step-end infinite | Cursor blink |
| `shake` | 0.3s | Error shake (4px left/right) |
| `countUp` | 0.4s | Count-up number reveal |

### 8.2 Transition Defaults
| Context | Duration | Easing |
|---------|----------|--------|
| Theme changes (bg/text) | 300ms | ease-out |
| Card hover effects | 200ms | ease-out |
| Sidebar collapse/expand | 300ms | ease-out |
| Button hover/active | 150ms | ease-out |
| Key press | 100ms | ease |
| Toast enter/exit | 300ms | ease-out |
| Modal backdrop | 200ms | (default) |

### 8.3 Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 9. Accessibility System

### 9.1 Skip Link
```html
<a href="#main-content" class="skip-link">Skip to content</a>
```
- Hidden off-screen (`top: -100%`) until focused
- On focus: drops to `top: 0` with green bg (#77d202), black text

### 9.2 Focus Indicators
- **Global**: `:focus-visible` → `outline: 2px solid #77d202`, `outline-offset: 2px`
- **Light mode**: `ring-offset: white`
- **Dark mode**: `ring-offset: black`
- **Mouse clicks**: `:focus:not(:focus-visible)` → no outline

### 9.3 Touch Targets (44px minimum)
```css
.btn-icon, .calc-key, button.sidebar-item, .sidebar-category-header {
  min-height: 44px;
  min-width: 44px;
}
```
On touch devices: inputs and interactive elements have `min-height: 48px`.

### 9.4 Screen Reader Support
- `.sr-only` class for visually hidden labels
- `aria-label` on icon-only buttons and keypad keys
- `aria-live="polite"` on toast container
- `role="dialog"`, `aria-modal="true"`, `aria-label` on modals
- `role="alert"` on toasts
- `for="id"` attributes on all `<label>` → `<input>` pairs

### 9.5 High Contrast Mode
```css
@media (prefers-contrast: high) {
  .card, .calc-key { border-width: 2px; }
  .text-gray-400 { color: #666 !important; }
}
```

---

## 10. Dark/Light Mode Implementation

### 10.1 Mechanism
- Uses Tailwind's `class` dark mode strategy
- Toggle: `<html>` element gets/removes `.dark` class
- Initial theme determined by: `localStorage('cv-theme')` > OS preference > `'dark'`

### 10.2 Transition
```css
body {
  @apply transition-colors duration-300;
}
```
All theme-aware elements use `transition-colors duration-300` for smooth switching.

### 10.3 CSS Variables (CSS Custom Properties)
Defined in `:root` and overridden in `html.dark`:
- `--bg-base`, `--bg-surface`, `--bg-surface-raised`
- `--border-light`
- `--text-primary`, `--text-secondary`, `--text-muted`

---

## 11. Glass & Decorative Effects

### Glass Header
```css
.glass {
  @apply bg-white/80 dark:bg-black/50 backdrop-blur-xl;
  @apply border border-white/20 dark:border-white/10;
}
```
Used on sticky top bars.

### Dot Grid Background
```css
.bg-dot-grid {
  background-image: radial-gradient(circle, currentColor 0.5px, transparent 0.5px);
  background-size: 20px 20px;
}
```
Subtle dot pattern, inherits color via `text-gray-300 dark:text-gray-800`.

### Selection Style
```css
::selection {
  @apply bg-primary/30 text-gray-900;
}
.dark ::selection {
  @apply bg-primary/40 text-white;
}
```

---

## 12. Utilities

### Text Gradient
```css
.text-gradient {
  @apply bg-clip-text text-transparent;
  @apply bg-gradient-to-r from-primary to-primary-dark;
}
```

### Scrollbar Styling
```css
.scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
.scrollbar-thin::-webkit-scrollbar-thumb { @apply bg-gray-300 rounded-full; }
/* Dark: bg-gray-700 */
.scrollbar-none::-webkit-scrollbar { display: none; }
```

---

## 13. File Structure (Design Assets)

```
assets/
├── css/
│   ├── main.css          # Tailwind directives + component classes
│   ├── themes.css        # Theme overrides (dark/light)
│   ├── calculator.css    # Calculator display & results
│   ├── keypad.css        # 3D Casio-style keypad system
│   └── accessibility.css # Skip links, focus, ARIA, reduced motion
├── js/
│   └── components/
│       ├── sidebar.js     # CalcVerseSidebar class
│       ├── keypad.js      # CalcVerseKeypad class (5 layouts)
│       ├── modal.js       # Modal singleton
│       └── toast.js       # Toast singleton
├── icons/                 # SVG icons (calcverse-192.svg, etc.)
└── ...other assets

tailwind.config.js         # Theme config (colors, fonts, animations)
```

---

## 14. Key Design Principles Summary

1. **Single accent color**: `#77d202` green everywhere — no gradients, no secondary accent
2. **Dark mode by default**: Rich black surfaces (`#0f1010`, `#1a1c1c`) with green accents
3. **Physical depth**: 3D key shadows, card hover lifts, sidebar slide transitions
4. **Consistent radius**: 12px (keys/cards), 16px (modals), 9999px (buttons)
5. **Mono numbers**: All numeric displays use JetBrains Mono for clarity
6. **Touch-first**: 44px minimum targets, 48px on touch devices
7. **Responsive sidebar**: 3 breakpoints (mobile overlay, tablet collapsed, desktop expanded)
8. **Accessible**: Skip links, focus rings, aria labels, reduced motion support
