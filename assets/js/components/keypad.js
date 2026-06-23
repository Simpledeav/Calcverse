/**
 * CalcVerse Keypad Component
 * On-screen keypad engine supporting 5 layouts: standard, scientific, financial, date, unit.
 */
class CalcVerseKeypad {
  /**
   * @param {Object} config
   * @param {'standard'|'scientific'|'financial'|'date'|'unit'} config.layout
   * @param {Object} config.target - Display/calculator instance to write to
   * @param {Function} config.onKey - Callback(key)
   */
  constructor(config = {}) {
    this.layout = config.layout || 'standard';
    this.target = config.target || null;
    this._onKey = config.onKey || null;
    this.container = null;
    this.keys = {};
    this.disabledKeys = new Set();
    this._highlightTimers = new Map();
  }

  /**
   * Render keypad into container.
   * @param {HTMLElement|string} containerEl
   */
  render(containerEl) {
    this.container = typeof containerEl === 'string'
      ? document.querySelector(containerEl)
      : containerEl;

    if (!this.container) return;

    const layouts = {
      'standard': this._renderStandard(),
      'scientific': this._renderScientific(),
      'financial': this._renderFinancial(),
      'date': this._renderDate(),
      'unit': this._renderUnit(),
    };

    this.container.innerHTML = `
      <div class="keypad-container ${this.layout === 'scientific' ? 'keypad-scientific' : ''}">
        ${layouts[this.layout] || layouts['standard']}
      </div>
    `;

    this._bindKeys();
  }

  /**
   * Render standard 4×5 keypad layout.
   * @returns {string}
   */
  _renderStandard() {
    return `
      <div class="keypad-standard">
        ${this._key('C', 'calc-key-clear')}
        ${this._key('±', 'calc-key-fn')}
        ${this._key('%', 'calc-key-fn')}
        ${this._key('÷', 'calc-key-op')}
        ${this._key('7', 'calc-key-num')}
        ${this._key('8', 'calc-key-num')}
        ${this._key('9', 'calc-key-num')}
        ${this._key('×', 'calc-key-op')}
        ${this._key('4', 'calc-key-num')}
        ${this._key('5', 'calc-key-num')}
        ${this._key('6', 'calc-key-num')}
        ${this._key('−', 'calc-key-op')}
        ${this._key('1', 'calc-key-num')}
        ${this._key('2', 'calc-key-num')}
        ${this._key('3', 'calc-key-num')}
        ${this._key('+', 'calc-key-op')}
        ${this._key('0', 'calc-key-wide calc-key-num')}
        ${this._key('.', 'calc-key-num')}
        ${this._key('=', 'calc-key-equals')}
      </div>
    `;
  }

  /**
   * Render scientific keypad.
   * @returns {string}
   */
  _renderScientific() {
    return `
      <div class="keypad-sci-ext">
        ${this._key('2nd', 'calc-key-fn')}
        ${this._key('sin', 'calc-key-fn')}
        ${this._key('cos', 'calc-key-fn')}
        ${this._key('tan', 'calc-key-fn')}
        ${this._key('log', 'calc-key-fn')}
        ${this._key('ln', 'calc-key-fn')}
        ${this._key('√', 'calc-key-fn')}
        ${this._key('x²', 'calc-key-fn')}
        ${this._key('xʸ', 'calc-key-fn')}
        ${this._key('π', 'calc-key-fn')}
        ${this._key('e', 'calc-key-fn')}
        ${this._key('(', 'calc-key-fn')}
        ${this._key(')', 'calc-key-fn')}
        ${this._key('!', 'calc-key-fn')}
        ${this._key('EE', 'calc-key-fn')}
      </div>
      <div class="keypad-standard">
        ${this._key('C', 'calc-key-clear')}
        ${this._key('±', 'calc-key-fn')}
        ${this._key('%', 'calc-key-fn')}
        ${this._key('÷', 'calc-key-op')}
        ${this._key('7', 'calc-key-num')}
        ${this._key('8', 'calc-key-num')}
        ${this._key('9', 'calc-key-num')}
        ${this._key('×', 'calc-key-op')}
        ${this._key('4', 'calc-key-num')}
        ${this._key('5', 'calc-key-num')}
        ${this._key('6', 'calc-key-num')}
        ${this._key('−', 'calc-key-op')}
        ${this._key('1', 'calc-key-num')}
        ${this._key('2', 'calc-key-num')}
        ${this._key('3', 'calc-key-num')}
        ${this._key('+', 'calc-key-op')}
        ${this._key('0', 'calc-key-wide calc-key-num')}
        ${this._key('.', 'calc-key-num')}
        ${this._key('=', 'calc-key-equals')}
      </div>
    `;
  }

  /**
   * Render financial keypad.
   * @returns {string}
   */
  _renderFinancial() {
    return `
      <div class="keypad-financial">
        ${this._key('PV', 'calc-key-fn')}
        ${this._key('FV', 'calc-key-fn')}
        ${this._key('N', 'calc-key-fn')}
        ${this._key('I/Y', 'calc-key-fn')}
        ${this._key('PMT', 'calc-key-fn')}
        ${this._key('C', 'calc-key-clear')}
        ${this._key('%', 'calc-key-fn')}
        ${this._key('÷', 'calc-key-op')}
        ${this._key('7')}
        ${this._key('8')}
        ${this._key('9')}
        ${this._key('×', 'calc-key-op')}
        ${this._key('4')}
        ${this._key('5')}
        ${this._key('6')}
        ${this._key('−', 'calc-key-op')}
        ${this._key('1')}
        ${this._key('2')}
        ${this._key('3')}
        ${this._key('+', 'calc-key-op')}
        ${this._key('0', 'calc-key-wide')}
        ${this._key('.')}
        ${this._key('=', 'calc-key-equals')}
      </div>
    `;
  }

  /**
   * Render date picker layout.
   * @returns {string}
   */
  _renderDate() {
    return `
      <div class="grid grid-cols-3 gap-3 p-2">
        <div class="col-span-3 grid grid-cols-7 gap-1 mb-2">
          ${['Mo','Tu','We','Th','Fr','Sa','Su'].map(d =>
            `<div class="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1">${d}</div>`
          ).join('')}
          ${Array.from({length: 31}, (_, i) => `
            <button class="calc-key h-10 text-sm ${i === 0 ? 'calc-key-fn' : ''}" data-key="${i + 1}">${i + 1}</button>
          `).join('')}
        </div>
        <button class="calc-key col-span-1 calc-key-clear" data-key="C">C</button>
        <button class="calc-key col-span-2 calc-key-equals" data-key="Today">Today</button>
      </div>
    `;
  }

  /**
   * Render unit converter layout.
   * @returns {string}
   */
  _renderUnit() {
    return `
      <div class="keypad-unit flex-col gap-2">
        <div class="flex gap-2">
          <select class="input-field flex-1" aria-label="From unit">
            <option value="">Select unit...</option>
          </select>
          <button class="btn-icon" aria-label="Swap units">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
          </button>
          <select class="input-field flex-1" aria-label="To unit">
            <option value="">Select unit...</option>
          </select>
        </div>
        <div class="keypad-numpad mx-auto">
          ${this._key('7', 'calc-key-num')}
          ${this._key('8', 'calc-key-num')}
          ${this._key('9', 'calc-key-num')}
          ${this._key('4', 'calc-key-num')}
          ${this._key('5', 'calc-key-num')}
          ${this._key('6', 'calc-key-num')}
          ${this._key('1', 'calc-key-num')}
          ${this._key('2', 'calc-key-num')}
          ${this._key('3', 'calc-key-num')}
          ${this._key('0', 'calc-key-wide calc-key-num')}
          ${this._key('.', 'calc-key-num')}
          ${this._key('C', 'calc-key-clear')}
        </div>
      </div>
    `;
  }

  /**
   * Generate a key button HTML.
   * @param {string} label
   * @param {string} className
   * @returns {string}
   */
  _key(label, className = '') {
    const ariaLabels = {
      '÷': 'Divide', '×': 'Multiply', '−': 'Subtract', '+': 'Add',
      '=': 'Equals', 'C': 'Clear', '±': 'Toggle Sign', '%': 'Percent',
      '.': 'Decimal Point', '⌫': 'Backspace',
    };
    const ariaLabel = ariaLabels[label] || label;
    return `<button class="calc-key ${className}" data-key="${label}" aria-label="${ariaLabel}" type="button">${label}</button>`;
  }

  /**
   * Bind click events to all keys.
   */
  _bindKeys() {
    if (!this.container) return;

    this.container.querySelectorAll('[data-key]').forEach(el => {
      el.addEventListener('click', () => {
        const key = el.dataset.key;
        if (!this.disabledKeys.has(key)) {
          this.press(key);
          this.highlight(key);
        }
      });

      // Touch feedback
      el.addEventListener('touchstart', () => {
        if (!this.disabledKeys.has(el.dataset.key)) {
          this.highlight(el.dataset.key);
        }
      }, { passive: true });
    });
  }

  /**
   * Trigger a key press.
   * @param {string} key
   */
  press(key) {
    if (this._onKey) {
      this._onKey(key);
    }
    // Also dispatch a custom event for loose coupling
    document.dispatchEvent(new CustomEvent('cv:keypress', {
      detail: { key, layout: this.layout }
    }));
  }

  /**
   * Visual highlight on a key.
   * @param {string} key
   */
  highlight(key) {
    if (!this.container) return;

    // Find the key by data-key attribute
    const keyEl = this.container.querySelector(`[data-key="${key}"]`);
    if (!keyEl) return;

    keyEl.classList.add('active');

    // Clear existing timer
    if (this._highlightTimers.has(key)) {
      clearTimeout(this._highlightTimers.get(key));
    }

    this._highlightTimers.set(key, setTimeout(() => {
      keyEl.classList.remove('active');
      this._highlightTimers.delete(key);
    }, 150));
  }

  /**
   * Switch keypad layout dynamically.
   * @param {'standard'|'scientific'|'financial'|'date'|'unit'} layout
   */
  setLayout(layout) {
    this.layout = layout;
    if (this.container) {
      this.render(this.container);
    }
  }

  /**
   * Disable specific keys (gray them out).
   * @param {string[]} keys
   */
  disable(keys) {
    keys.forEach(k => this.disabledKeys.add(k));
    if (this.container) {
      keys.forEach(k => {
        const el = this.container.querySelector(`[data-key="${k}"]`);
        if (el) el.disabled = true;
      });
    }
  }

  /**
   * Re-enable keys.
   * @param {string[]} keys
   */
  enable(keys) {
    keys.forEach(k => this.disabledKeys.delete(k));
    if (this.container) {
      keys.forEach(k => {
        const el = this.container.querySelector(`[data-key="${k}"]`);
        if (el) el.disabled = false;
      });
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CalcVerseKeypad };
}
