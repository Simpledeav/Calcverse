/**
 * CalcVerse Keyboard Bridge
 * Maps physical keyboard keys to calculator actions.
 */
class KeyboardBridge {
  /**
   * @param {Object} keypad - The keypad instance to forward key presses to
   */
  constructor(keypad) {
    this.keypad = keypad;
    this.bound = false;
    this._handler = this._handleKeyDown.bind(this);
  }

  /**
   * Bind keyboard listeners.
   * Call after the calculator DOM is ready.
   */
  bind() {
    if (this.bound) return;
    document.addEventListener('keydown', this._handler);
    this.bound = true;
  }

  /**
   * Unbind keyboard listeners.
   */
  unbind() {
    document.removeEventListener('keydown', this._handler);
    this.bound = false;
  }

  /**
   * Handle keydown events.
   * @param {KeyboardEvent} e
   */
  _handleKeyDown(e) {
    // Don't capture if user is typing in an input field
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    const key = e.key;
    const map = this._getKeyMap();

    if (map[key]) {
      e.preventDefault();
      const action = map[key];
      this.keypad.highlight(action.displayKey || action);
      this.keypad.press(action.action || action);
    }
  }

  /**
   * Get the key-to-action mapping.
   * @returns {Object}
   */
  _getKeyMap() {
    const layout = this.keypad.layout || 'standard';
    const base = {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      '.': '.',
      '+': '+',
      '-': '−',
      '*': { action: '×', displayKey: '*' },
      '/': { action: '÷', displayKey: '/' },
      'Enter': { action: '=', displayKey: 'Enter' },
      'Backspace': { action: '⌫', displayKey: '⌫' },
      'Delete': { action: 'CE', displayKey: 'Del' },
      'Escape': { action: 'C', displayKey: 'Esc' },
      '%': '%',
    };

    if (layout === 'scientific') {
      return {
        ...base,
        's': { action: 'sin', displayKey: 's' },
        'c': { action: 'cos', displayKey: 'c' },
        't': { action: 'tan', displayKey: 't' },
        'l': { action: 'log', displayKey: 'l' },
        'n': { action: 'ln', displayKey: 'n' },
        'q': { action: '√', displayKey: 'q' },
        'p': { action: 'π', displayKey: 'p' },
        'e': { action: 'e', displayKey: 'e' },
        '^': { action: 'xʸ', displayKey: '^' },
        '(': '(', ')': ')',
        '!': '!',
        'F9': { action: '±', displayKey: 'F9' },
      };
    }

    if (layout === 'financial') {
      return {
        ...base,
        'F9': { action: '±', displayKey: 'F9' },
      };
    }

    // Standard and others
    return {
      ...base,
      'F9': { action: '±', displayKey: 'F9' },
    };
  }

  /**
   * Show keyboard shortcut help overlay.
   */
  showShortcutHelp() {
    const shortcuts = [
      ['0-9', 'Number input'],
      ['.', 'Decimal point'],
      ['+', 'Addition'],
      ['-', 'Subtraction'],
      ['*', 'Multiplication'],
      ['/', 'Division'],
      ['Enter', 'Calculate / Equals'],
      ['Backspace', 'Delete last character'],
      ['Delete', 'Clear entry'],
      ['Escape', 'Clear all'],
      ['F9', 'Toggle ±'],
      ['%', 'Percentage'],
      ['s, c, t', 'sin, cos, tan (Scientific)'],
      ['l, n', 'log, ln (Scientific)'],
      ['q', '√ (Scientific)'],
      ['p', 'π (Scientific)'],
      ['^', 'Power (Scientific)'],
    ];

    const html = `
      <div class="shortcut-help">
        <h3 class="text-lg font-semibold mb-4">⌨️ Keyboard Shortcuts</h3>
        <div class="grid grid-cols-2 gap-2">
          ${shortcuts.map(([key, desc]) => `
            <div class="flex items-center gap-2 text-sm">
              <kbd class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono text-xs">${key}</kbd>
              <span class="text-gray-600 dark:text-gray-400">${desc}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Dispatch to modal system if available
    document.dispatchEvent(new CustomEvent('cv:show-modal', {
      detail: { content: html, title: 'Keyboard Shortcuts' }
    }));
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KeyboardBridge };
}
