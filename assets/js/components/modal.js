/**
 * CalcVerse Modal System
 * Reusable modal dialog for formula explanations, keyboard shortcuts, share options, etc.
 */
const Modal = {
  _active: null,

  /**
   * Show a modal dialog.
   * @param {Object} options
   * @param {string} options.title - Modal title
   * @param {string} options.content - HTML content
   * @param {string} [options.size='md'] - 'sm' | 'md' | 'lg'
   * @param {boolean} [options.closable=true]
   * @param {Function} [options.onClose]
   */
  show({ title, content, size = 'md', closable = true, onClose = null }) {
    this.close();

    const sizes = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
    };

    const wrapper = document.createElement('div');
    wrapper.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    wrapper.setAttribute('role', 'dialog');
    wrapper.setAttribute('aria-modal', 'true');
    wrapper.setAttribute('aria-label', title);

    wrapper.innerHTML = `
      <div class="modal-backdrop fixed inset-0 transition-opacity duration-200"></div>
      <div class="relative ${sizes[size] || sizes.md} w-full bg-white dark:bg-raised-dark rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-h-[85vh] flex flex-col animate-slide-up">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">${this._escapeHtml(title)}</h2>
          ${closable ? '<button class="btn-icon modal-close" aria-label="Close modal">&times;</button>' : ''}
        </div>
        <!-- Body -->
        <div class="px-6 py-4 overflow-y-auto flex-1">${content}</div>
      </div>
    `;

    document.body.appendChild(wrapper);
    this._active = wrapper;

    // Bind close events
    if (closable) {
      wrapper.querySelector('.modal-close')?.addEventListener('click', () => this.close());
      wrapper.querySelector('.modal-backdrop')?.addEventListener('click', () => this.close());

      // Close on Escape
      this._keyHandler = (e) => {
        if (e.key === 'Escape') this.close();
      };
      document.addEventListener('keydown', this._keyHandler);
    }

    // Focus trap
    wrapper.querySelector('button')?.focus();

    if (onClose) this._onClose = onClose;
  },

  /**
   * Close the active modal.
   */
  close() {
    if (this._active) {
      this._active.remove();
      this._active = null;
    }
    if (this._keyHandler) {
      document.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }
    if (this._onClose) {
      this._onClose();
      this._onClose = null;
    }
  },

  /**
   * Show formula reference modal.
   * @param {string} formulaName
   * @param {string} formulaLatex - Display formula (HTML)
   * @param {string} description
   * @param {Object} [variables] - { name: description }
   */
  showFormula(formulaName, formulaLatex, description, variables = {}) {
    const varRows = Object.entries(variables).map(([name, desc]) => `
      <div class="flex items-center gap-3">
        <code class="font-mono font-semibold text-primary text-sm w-16">${name}</code>
        <span class="text-gray-600 dark:text-gray-400 text-sm">${desc}</span>
      </div>
    `).join('');

    this.show({
      title: formulaName,
      size: 'md',
      content: `
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-gray-50 dark:bg-black/30 text-center">
            <code class="font-mono text-lg text-gray-900 dark:text-gray-100">${formulaLatex}</code>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">${description}</p>
          ${varRows ? `
            <div class="space-y-2 p-4 rounded-xl bg-gray-50 dark:bg-black/30">
              <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Variables</p>
              ${varRows}
            </div>
          ` : ''}
        </div>
      `,
    });
  },

  /**
   * Escape HTML entities.
   * @param {string} text
   * @returns {string}
   */
  _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },
};

// Listen for modal events
document.addEventListener('cv:show-modal', (e) => {
  if (e.detail) {
    Modal.show(e.detail);
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Modal };
}
