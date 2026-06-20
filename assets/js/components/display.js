/**
 * CalcVerse Display Component
 * Universal display panel for all calculators — shows expression and result with actions.
 */
class CalcVerseDisplay {
  /**
   * @param {HTMLElement|string} containerEl
   * @param {Object} [options]
   * @param {Function} [options.onCopy]
   * @param {Function} [options.onHistoryToggle]
   */
  constructor(containerEl, options = {}) {
    this.container = typeof containerEl === 'string'
      ? document.querySelector(containerEl)
      : containerEl;
    this.expression = '';
    this.result = '0';
    this.error = false;
    this.historyOpen = false;
    this.history = [];
    this._onCopy = options.onCopy || null;
    this._onHistoryToggle = options.onHistoryToggle || null;
    this.render();
  }

  /**
   * Render the display HTML.
   */
  render() {
    this.container.innerHTML = `
      <div class="calc-display">
        <!-- Expression -->
        <div class="calc-display-expression" id="calc-expression">${this.expression || '&nbsp;'}</div>
        
        <!-- Result -->
        <div class="calc-display-result ${this.error ? 'error' : ''}" id="calc-result">
          ${this._formatResult(this.result)}
        </div>
        
        <!-- Action Bar -->
        <div class="calc-display-actions">
          <button class="btn-ghost" id="btn-history" title="History" aria-label="Toggle calculation history">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span class="hidden sm:inline text-xs">History</span>
          </button>
          <button class="btn-ghost" id="btn-copy" title="Copy result" aria-label="Copy result to clipboard">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        </div>

        <!-- History Panel -->
        <div class="calc-history-panel closed" id="history-panel">
          <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">History</h3>
            <button class="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" id="btn-clear-history">Clear</button>
          </div>
          <div class="overflow-y-auto max-h-64" id="history-list">
            ${this.history.length === 0
              ? '<div class="px-4 py-6 text-center text-xs text-gray-400">No calculations yet</div>'
              : this.history.map(h => `
                <div class="calc-history-item">
                  <div class="calc-history-expression">${h.expression}</div>
                  <div class="calc-history-result">${h.result}</div>
                </div>
              `).join('')
            }
          </div>
        </div>
      </div>
    `;

    this._bindEvents();
  }

  /**
   * Bind display events.
   */
  _bindEvents() {
    this.container.querySelector('#btn-copy')?.addEventListener('click', () => {
      this.copyResult();
    });

    this.container.querySelector('#btn-history')?.addEventListener('click', () => {
      this.toggleHistory();
    });

    this.container.querySelector('#btn-clear-history')?.addEventListener('click', () => {
      this.clearHistory();
    });
  }

  /**
   * Update the display.
   * @param {string} expression - Math expression string
   * @param {string|number} result - Result value
   * @param {boolean} [isError] - Whether there's an error
   */
  update(expression, result, isError = false) {
    this.expression = expression;
    this.result = result;
    this.error = isError;

    const exprEl = this.container.querySelector('#calc-expression');
    const resultEl = this.container.querySelector('#calc-result');

    if (exprEl) {
      exprEl.textContent = expression || '\u00A0';
      exprEl.scrollLeft = exprEl.scrollWidth;
    }

    if (resultEl) {
      resultEl.className = `calc-display-result ${isError ? 'error' : ''}`;
      resultEl.textContent = this._formatResult(result);
      // Animation
      resultEl.classList.remove('calc-count-up');
      // Force reflow
      void resultEl.offsetWidth;
      resultEl.classList.add('calc-count-up');
    }
  }

  /**
   * Set the result (convenience method).
   * @param {string|number} value
   */
  setResult(value) {
    this.update(this.expression, value, false);
  }

  /**
   * Set error state.
   * @param {string} message
   */
  setError(message) {
    this.update(this.expression, message, true);
  }

  /**
   * Copy result to clipboard.
   */
  async copyResult() {
    const text = this.result.toString();
    try {
      await navigator.clipboard.writeText(text);
      // Dispatch toast event
      document.dispatchEvent(new CustomEvent('cv:toast', {
        detail: { message: 'Copied to clipboard!', type: 'success' }
      }));
    } catch {
      document.dispatchEvent(new CustomEvent('cv:toast', {
        detail: { message: 'Failed to copy', type: 'error' }
      }));
    }
  }

  /**
   * Toggle history panel visibility.
   */
  toggleHistory() {
    this.historyOpen = !this.historyOpen;
    const panel = this.container.querySelector('#history-panel');
    if (panel) {
      panel.classList.toggle('open', this.historyOpen);
      panel.classList.toggle('closed', !this.historyOpen);
    }
    if (this._onHistoryToggle) this._onHistoryToggle(this.historyOpen);
  }

  /**
   * Set history entries.
   * @param {Array<{expression: string, result: string}>} entries
   */
  setHistory(entries) {
    this.history = entries;
    const list = this.container.querySelector('#history-list');
    if (!list) return;

    if (entries.length === 0) {
      list.innerHTML = '<div class="px-4 py-6 text-center text-xs text-gray-400">No calculations yet</div>';
    } else {
      list.innerHTML = entries.map(h => `
        <div class="calc-history-item">
          <div class="calc-history-expression">${h.expression}</div>
          <div class="calc-history-result">${h.result}</div>
        </div>
      `).join('');
    }
  }

  /**
   * Clear history.
   */
  clearHistory() {
    this.setHistory([]);
    document.dispatchEvent(new CustomEvent('cv:toast', {
      detail: { message: 'History cleared', type: 'info' }
    }));
  }

  /**
   * Format a result for display.
   * @param {string|number} value
   * @returns {string}
   */
  _formatResult(value) {
    if (value === null || value === undefined || value === '') return '0';
    const str = value.toString();
    // Handle long numbers
    if (str.length > 14 && !isNaN(str)) {
      const num = parseFloat(str);
      if (Math.abs(num) > 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
        return num.toExponential(6);
      }
    }
    return str;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CalcVerseDisplay };
}
